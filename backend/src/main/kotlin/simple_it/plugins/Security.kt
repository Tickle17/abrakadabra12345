import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*

fun Application.configureSecurity() {
    install(CORS) {
        allowCredentials = true
        anyHost()
    }
}
