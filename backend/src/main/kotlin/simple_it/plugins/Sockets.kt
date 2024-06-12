package simple_it.plugins

import UUIDSerializer
import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import kotlinx.coroutines.channels.ClosedReceiveChannelException
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.modules.SerializersModule
import kotlinx.serialization.modules.contextual
import simple_it.models.chat.chatDAO.MessagesService
import java.time.Duration
import java.util.*

fun Application.configureSockets() {
    install(WebSockets) {
        pingPeriod = Duration.ofSeconds(60)
        timeout = Duration.ofSeconds(60)
        maxFrameSize = Long.MAX_VALUE
        masking = false
    }
    val messagesService = MessagesService()
    val userConnections = mutableMapOf<String, MutableList<DefaultWebSocketSession>>()

    routing {
        webSocket("/ws/{userId}/{businessId}/{vacancyId}") {
            val userId = call.parameters["userId"]?.let { UUID.fromString(it) }
            val businessId = call.parameters["businessId"]?.let { UUID.fromString(it) }
            val vacancyId = call.parameters["vacancyId"]?.let { UUID.fromString(it) }

            if (userId == null || businessId == null || vacancyId == null) {
                close(CloseReason(CloseReason.Codes.CANNOT_ACCEPT, "Missing or invalid parameters"))
                return@webSocket
            }

            val userSession = this
            val connectionKey = "$userId-$businessId-$vacancyId"
            userConnections.getOrPut(connectionKey) { mutableListOf() }.add(userSession)
            val initialMessages = messagesService.getMessagesByUserBusinessVacancy(userId, businessId, vacancyId)
            val json = Json {
                serializersModule = SerializersModule {
                    contextual(UUIDSerializer)
                    contextual(LocalDateSerializer)
                }
            }
            send(json.encodeToString(initialMessages))

            val updateJob = launch {
                while (true) {
                    delay(10000)
                    val currentMessages =
                        messagesService.getMessagesByUserBusinessVacancy(userId, businessId, vacancyId)
                    try {
                        send(json.encodeToString(currentMessages))
                    } catch (e: Throwable) {
                        println("Error sending message: ${e.localizedMessage}")
                    }
                }
            }

            try {
                for (frame in incoming) {
                    frame as? Frame.Text ?: continue
                }
            } catch (e: ClosedReceiveChannelException) {
                println("Client disconnected: $this")
            } finally {
                userConnections.forEach { (key, sessions) ->
                    sessions.remove(this)
                }
                updateJob.cancel()
            }
        }
    }
}