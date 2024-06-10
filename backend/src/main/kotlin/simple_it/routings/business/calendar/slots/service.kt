package simple_it.routings.business.calendar.slots

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.util.pipeline.*
import simple_it.models.slot.slotDAO.CalendarSlotService
import simple_it.models.slot.slotDTO.CreateVacancySlotCalendar
import java.util.*

suspend fun PipelineContext<Unit, ApplicationCall>.create(
    calendarSlotService: CalendarSlotService
) {
    try {
        val slot = call.receive<CreateVacancySlotCalendar>()
        val id = calendarSlotService.create(slot)
        call.respond(HttpStatusCode.Created, id)
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.read(
    calendarSlotService: CalendarSlotService
) {
    try {
        val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
        val slot = calendarSlotService.read(id)
        if (slot != null) {
            call.respond(HttpStatusCode.OK, slot)
        } else {
            call.respond(HttpStatusCode.NotFound, "Slot not found")
        }
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.readAll(
    calendarSlotService: CalendarSlotService
) {
    try {
        val slots = calendarSlotService.readAll()
        call.respond(HttpStatusCode.OK, slots)
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.update(
    calendarSlotService: CalendarSlotService
) {
    try {
        val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
        val slot = call.receive<CreateVacancySlotCalendar>()
        val updated = calendarSlotService.update(id, slot)
        if (updated) {
            call.respond(HttpStatusCode.OK, "Slot updated successfully")
        } else {
            call.respond(HttpStatusCode.NotFound, "Slot not found")
        }
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.delete(
    calendarSlotService: CalendarSlotService
) {
    try {
        val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
        val deleted = calendarSlotService.delete(id)
        if (deleted) {
            call.respond(HttpStatusCode.OK, "Slot deleted successfully")
        } else {
            call.respond(HttpStatusCode.NotFound, "Slot not found")
        }
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}