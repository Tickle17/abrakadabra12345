package simple_it.routings.business.createVacancy

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.util.pipeline.*
import simple_it.models.vacancy.vacancyDAO.VacancyService
import simple_it.models.vacancy.vacancyDTO.VacancyDTO
import java.util.*

suspend fun PipelineContext<Unit, ApplicationCall>.delete(
    vacancyService: VacancyService
) {
    val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
    vacancyService.delete(id)
    call.respond(HttpStatusCode.OK)
}

suspend fun PipelineContext<Unit, ApplicationCall>.create(vacancyService: VacancyService) {
    try {
        val vacancy = call.receive<VacancyDTO>()
        val id = vacancyService.create(vacancy)
        call.respond(HttpStatusCode.Created, id)
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.editModel(vacancyService: VacancyService) {
    val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
    val vacancy = call.receive<VacancyDTO>()
    vacancyService.update(id, vacancy)
    call.respond(HttpStatusCode.OK, vacancy)
}

suspend fun PipelineContext<Unit, ApplicationCall>.findModel(vacancyService: VacancyService) {
    val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
    val vacancy = vacancyService.read(id)
    if (vacancy != null) {
        call.respond(HttpStatusCode.OK, vacancy)
    } else {
        call.respond(HttpStatusCode.NotFound)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.findAllModel(vacancyService: VacancyService) {
    val vacancies = vacancyService.getAllVacancies()
    call.respond(HttpStatusCode.OK, vacancies)
}