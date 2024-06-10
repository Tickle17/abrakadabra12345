package simple_it.routings.business.calendar

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.util.pipeline.*
import simple_it.models.calendar.calendarDAO.CalendarService
import simple_it.models.calendar.calendarDTO.CreateVacancyCalendar
import java.util.*

suspend fun PipelineContext<Unit, ApplicationCall>.create(
    calendarService: CalendarService
) {
    try {
        val user = call.receive<CreateVacancyCalendar>()
        val id = calendarService.create(user)
        call.respond(HttpStatusCode.Created, id)
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.read(
    calendarService: CalendarService
) {
    try {
        val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
        val calendar = calendarService.read(id)
        if (calendar != null) {
            call.respond(HttpStatusCode.OK, calendar)
        } else {
            call.respond(HttpStatusCode.NotFound, "Calendar not found")
        }
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.readAll(
    calendarService: CalendarService
) {
    try {
        val calendars = calendarService.readAll()
        call.respond(HttpStatusCode.OK, calendars)
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.update(
    calendarService: CalendarService
) {
    try {
        val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
        val calendar = call.receive<CreateVacancyCalendar>()
        val updated = calendarService.update(id, calendar)
        if (updated) {
            call.respond(HttpStatusCode.OK, "Calendar updated successfully")
        } else {
            call.respond(HttpStatusCode.NotFound, "Calendar not found")
        }
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.delete(
    calendarService: CalendarService
) {
    try {
        val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
        val deleted = calendarService.delete(id)
        if (deleted) {
            call.respond(HttpStatusCode.OK, "Calendar deleted successfully")
        } else {
            call.respond(HttpStatusCode.NotFound, "Calendar not found")
        }
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}
