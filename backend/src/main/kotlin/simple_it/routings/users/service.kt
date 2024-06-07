package simple_it.routings.users

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.util.pipeline.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import simple_it.models.users.userDAO.UserService
import simple_it.models.users.usersDTO.CreateUser
import simple_it.models.users.usersDTO.UpdateUser
import java.util.*

suspend fun PipelineContext<Unit, ApplicationCall>.delete(
    userService: UserService
) {
    val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
    userService.delete(id)
    call.respond(HttpStatusCode.OK)
}

suspend fun PipelineContext<Unit, ApplicationCall>.findModel(
    userService: UserService
) {
    val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
    val user = userService.read(id)
    if (user != null) {
        call.respond(HttpStatusCode.OK, user)
    } else {
        call.respond(HttpStatusCode.NotFound)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.editModel(
    userService: UserService
) {
    val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
    val user = call.receive<UpdateUser>()
    userService.update(id, user)
    call.respond(HttpStatusCode.OK, user)
}

suspend fun PipelineContext<Unit, ApplicationCall>.loginUser(
    userService: UserService
) {
    val json = call.receive<String>()
    val jsonParsed = Json.parseToJsonElement(json).jsonObject
    val login = jsonParsed["login"]?.jsonPrimitive?.content
    val password = jsonParsed["password"]?.jsonPrimitive?.content

    if (login != null && password != null) {
        val userId = userService.readByLoginAndPassword(login, password)
        if (userId != null) {
            call.respond(HttpStatusCode.OK, userId)
        } else {
            call.respond(HttpStatusCode.NotFound, "User not found")
        }
    } else {
        call.respond(HttpStatusCode.BadRequest, "Invalid login")
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.create(
    userService: UserService
) {
    try {
        val user = call.receive<CreateUser>()
        val id = userService.create(user)
        call.respond(HttpStatusCode.Created, id)
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}
