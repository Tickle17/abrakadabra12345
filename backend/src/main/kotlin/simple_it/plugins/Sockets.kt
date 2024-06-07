package simple_it.plugins

import io.ktor.network.selector.*
import io.ktor.network.sockets.*
import io.ktor.network.tls.*
import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.utils.io.*
import io.ktor.utils.io.core.*
import io.ktor.websocket.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.channels.ClosedReceiveChannelException
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.Database
import java.io.InputStream
import java.time.Duration
import java.util.*

fun Application.configureSockets() {
    install(WebSockets) {
        pingPeriod = Duration.ofSeconds(60)
        timeout = Duration.ofSeconds(60)
        maxFrameSize = Long.MAX_VALUE
        masking = false
    }
    val database = Database.connect(
        url = environment.config.property("postgres.url").getString(),
        user = environment.config.property("postgres.user").getString(),
        password = environment.config.property("postgres.password").getString(),
        driver = "org.postgresql.Driver"
    )
    val userConnections = mutableMapOf<String, MutableList<DefaultWebSocketSession>>()

    routing {
        val connections = mutableListOf<DefaultWebSocketSession>()
        webSocket("/ws") {
            val userService = call.application.userService(database)
            val users = userService.getAllUsers()
                .map { (id, login) -> mapOf("login" to login, "id" to id.toString()) }

            try {
                // Добавляем текущее WebSocket соединение в соответствующий список в словаре и отправляем при подключении по ws юзеров
                val receivedJson = incoming.receive() as Frame.Text
                println(receivedJson)
                val userId = getUserIdFromSession(receivedJson.readText())
                println(userId)
                val userSession = this
                userConnections.getOrPut(userId) { mutableListOf() }.add(userSession)
                send(Json.encodeToString(users))

                for (frame in incoming) {
                    frame as? Frame.Text ?: continue
                    val receivedText = frame.readText()
                    println("Received: $receivedText")

                    // Получаем id получателя ищем его соединения в словаре и отправляем сообщение
                    val json = Json.decodeFromString<Map<String, String>>(receivedText)
                    val senderId = json["id"]
                    val recipientId = json["recipientId"]
                    println(recipientId)

                    val message = json["message"] ?: continue
                    println(message)
                    val messageToSend = Json.encodeToString(
                        mapOf(
                            "senderId" to senderId,
                            "recipientId" to recipientId,
                            "message" to message,
                            "newMessage" to "true"
                        )
                    )

                    println(messageToSend)

                    val senderSessions = userConnections[senderId] ?: continue
                    val recipientSessions = userConnections[recipientId] ?: continue

                    senderSessions.forEach { session ->
                        try {
                            session.send(Frame.Text(messageToSend))
                        } catch (e: Throwable) {
                            println("Error sending message to sender: ${e.localizedMessage}")
                        }
                    }
                    recipientSessions.forEach { session ->
                        try {
                            session.send(Frame.Text(messageToSend))
                        } catch (e: Throwable) {
                            println("Error sending message to recipient: ${e.localizedMessage}")
                        }
                    }
                }
            } catch (e: ClosedReceiveChannelException) {
                println("Client disconnected: $this")

                // Удаляем соединение из списка при отключении клиента
                userConnections.forEach { (_, sessions) ->
                    sessions.remove(this)
                }
            } finally {
                // Удаляем соединение из списка при отключении клиента
                userConnections.forEach { (_, sessions) ->
                    sessions.remove(this)
                }
            }
        }
    }
}

fun getUserIdFromSession(json: String): String {
    // Декодируем JSON в Map
    val jsonMap = Json.decodeFromString<Map<String, String>>(json)
    // Извлекаем идентификатор пользователя из JSON
    return jsonMap["id"] ?: error("User ID is not provided in the JSON")
}


object EchoApp {
    val selectorManager = ActorSelectorManager(Dispatchers.IO)
    val DefaultPort = 9002

    object Server {
        @JvmStatic
        fun main(args: Array<String>) {
            runBlocking {
                val serverSocket = aSocket(selectorManager).tcp().bind(port = DefaultPort)
                println("Echo Server listening at ${serverSocket.localAddress}")
                while (true) {
                    val socket = serverSocket.accept()
                    println("Accepted $socket")
                    launch {
                        val read = socket.openReadChannel()
                        val write = socket.openWriteChannel(autoFlush = true)
                        try {
                            while (true) {
                                val line = read.readUTF8Line()
                                write.writeStringUtf8("$line\n")
                            }
                        } catch (e: Throwable) {
                            socket.close()
                        }
                    }
                }
            }
        }
    }

    object Client {
        @JvmStatic
        fun main(args: Array<String>) {
            runBlocking {
                val socket = aSocket(selectorManager).tcp().connect("127.0.0.1", port = DefaultPort)
                val read = socket.openReadChannel()
                val write = socket.openWriteChannel(autoFlush = true)

                launch(Dispatchers.IO) {
                    while (true) {
                        val line = read.readUTF8Line()
                        println("server: $line")
                    }
                }

                for (line in System.`in`.lines()) {
                    println("client: $line")
                    write.writeStringUtf8("$line\n")
                }
            }
        }

        private fun InputStream.lines() = Scanner(this).lines()

        private fun Scanner.lines() = sequence {
            while (hasNext()) {
                yield(readlnOrNull())
            }
        }
    }
}

object TlsRawSocket {
    @JvmStatic
    fun main(args: Array<String>) {
        runBlocking {
            val selectorManager = ActorSelectorManager(Dispatchers.IO)
            val socket = aSocket(selectorManager).tcp().connect("www.google.com", port = 443)
                .tls(coroutineContext = coroutineContext)
            val write = socket.openWriteChannel()
            val EOL = "\r\n"
            write.writeStringUtf8("GET / HTTP/1.1${EOL}Host: www.google.com${EOL}Connection: close${EOL}${EOL}")
            write.flush()
            println(socket.openReadChannel().readRemaining().readBytes().toString(Charsets.UTF_8))
        }
    }
}
