package simple_it.routings.chats

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.util.pipeline.*
import simple_it.models.chat.chatDAO.DefaultMessagesService
import simple_it.models.chat.chatDAO.MessagesService
import simple_it.models.chat.chatDAO.ReactionsVacancyService
import simple_it.models.chat.chatDTO.DefaultMessageDTO
import simple_it.models.chat.chatDTO.MessageDTO
import simple_it.models.chat.chatDTO.ReactionsVacancyDTO
import simple_it.models.chat.chatDTO.UpdateReactionsVacancy
import java.util.*

suspend fun PipelineContext<Unit, ApplicationCall>.create(
    reactionsVacancyService: ReactionsVacancyService
) {
    try {
        val user = call.receive<ReactionsVacancyDTO>()
        val id = reactionsVacancyService.create(user)
        call.respond(HttpStatusCode.Created, id)
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.update(
    reactionsVacancyService: ReactionsVacancyService
) {
    try {
        val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
        val updatedReactionsVacancy = call.receive<UpdateReactionsVacancy>()
        val updated = reactionsVacancyService.update(id, updatedReactionsVacancy)
        if (updated) {
            call.respond(HttpStatusCode.OK, "Reaction updated successfully")
        } else {
            call.respond(HttpStatusCode.NotFound, "Reaction not found")
        }
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.getAllbyId(
    reactionsVacancyService: ReactionsVacancyService
) {
    try {
        val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
        val details = reactionsVacancyService.findReactionsById(id)
        if (details != null) {
            call.respond(HttpStatusCode.OK, details)
        } else {
            call.respond(HttpStatusCode.NotFound, "No matching records found")
        }
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.getAllReactions(
    reactionsVacancyService: ReactionsVacancyService
) {
    try {
        val reactions = reactionsVacancyService.getAllReactions()
        if (reactions.isNotEmpty()) {
            call.respond(HttpStatusCode.OK, reactions)
        } else {
            call.respond(HttpStatusCode.NotFound, "No reactions found")
        }
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}


suspend fun PipelineContext<Unit, ApplicationCall>.postMessage(
    messagesService: MessagesService
) {
    try {
        val user = call.receive<MessageDTO>()
        val id = messagesService.postMessage(user)
        call.respond(HttpStatusCode.Created, id)
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.getMessagesByUserBusinessVacancy(
    messagesService: MessagesService
) {
    try {
        val userId = call.parameters["userId"]?.let { UUID.fromString(it) }
        val businessId = call.parameters["businessId"]?.let { UUID.fromString(it) }
        val vacancyId = call.parameters["vacancyId"]?.let { UUID.fromString(it) }

        if (userId == null || businessId == null || vacancyId == null) {
            call.respond(HttpStatusCode.BadRequest, "Missing or invalid parameters")
            return
        }
        val messages = messagesService.getMessagesByUserBusinessVacancy(userId, businessId, vacancyId)
        call.respond(HttpStatusCode.OK, messages)
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.create(
    defaultMessagesService: DefaultMessagesService
) {
    try {
        val user = call.receive<DefaultMessageDTO>()
        val id = defaultMessagesService.create(user)
        call.respond(HttpStatusCode.Created, id)
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}