package simple_it.routings.chats

import io.ktor.server.application.*
import io.ktor.server.routing.*
import simple_it.models.chat.chatDAO.DefaultMessagesService
import simple_it.models.chat.chatDAO.MessagesService
import simple_it.models.chat.chatDAO.ReactionsVacancyService


fun Application.chatRout(
    reactionsVacancyService: ReactionsVacancyService,
    messagesService: MessagesService,
    defaultMessagesService: DefaultMessagesService
) {
    routing {
        // reaction on vacancy
        post("/reaction") {
            create(reactionsVacancyService)
        }
        put("/reaction/{id}") {
            update(reactionsVacancyService)
        }
        get("/reactions/{id}") {
            getAllbyId(reactionsVacancyService)
        }
        get("/reactions") {
            getAllReactions(reactionsVacancyService)
        }
        post("/message") {
            postMessage(messagesService)
        }

        get("/messages/{userId}/{businessId}/{vacancyId}") {
            getMessagesByUserBusinessVacancy(messagesService)
        }

        post("/defaultMessage") {
            create(defaultMessagesService)
        }
        get("/defaultMessages/{businessId}") {
            getByBusinessId(defaultMessagesService)
        }

        put("/defaultMessages/{id}") {
            putById(defaultMessagesService)
        }

        delete("/defaultMessages/{id}") {
            deleteById(defaultMessagesService)
        }
    }
}