package simple_it.routings.business.calendar.slots

import io.ktor.server.application.*
import io.ktor.server.routing.*
import simple_it.models.slot.slotDAO.CalendarSlotService

fun Application.calendarSlotsRout(calendarSlotService: CalendarSlotService) {
    routing {
        post("/slot") {
            create(calendarSlotService)
        }
        put("/slot/{id}") {
            update(calendarSlotService)
        }
        get("/slot/{id}") {
            read(calendarSlotService)
        }
        get("/slots") {
            readAll(calendarSlotService)
        }
        delete("/slot/{id}") {
            delete(calendarSlotService)
        }
    }
}