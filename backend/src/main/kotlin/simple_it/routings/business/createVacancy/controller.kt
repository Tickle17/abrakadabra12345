package simple_it.routings.business.createVacancy

import io.ktor.server.application.*
import io.ktor.server.routing.*
import simple_it.models.vacancy.vacancyDAO.VacancyService

fun Application.vacancy(vacancyService: VacancyService) {
    routing {
        // Create user
        post("/vacancy") {
            create(vacancyService)
        }
        // Update user
        put("/vacancy/{id}") {
            editModel(vacancyService)
        }
        // Read user
        get("/vacancy/{id}") {
            findModel(vacancyService)
        }
        get("/vacancies") {
            findAllModel(vacancyService)
        }
        // Delete user
        delete("/vacancy/{id}") {
            delete(vacancyService)
        }
    }
}