package simple_it.plugins

import UUIDSerializer
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import kotlinx.serialization.KSerializer
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import kotlinx.serialization.json.Json
import kotlinx.serialization.modules.SerializersModule
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*

object LocalDateSerializer : KSerializer<LocalDateTime> {
    private val formatter = DateTimeFormatter.ISO_DATE_TIME
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("LocalDateTime", PrimitiveKind.STRING)

    override fun serialize(encoder: Encoder, value: LocalDateTime) {
        val result = value.format(formatter)
        encoder.encodeString(result)
    }

    override fun deserialize(decoder: Decoder): LocalDateTime {
        return LocalDateTime.parse(decoder.decodeString())
    }
}

fun Application.configureSerialization() {
    install(ContentNegotiation) {
        json(Json {
            serializersModule = SerializersModule {
                contextual(UUID::class, UUIDSerializer)
                contextual(LocalDateTime::class, LocalDateSerializer)

            }
            isLenient = true
            ignoreUnknownKeys = true
        })
    }
}
