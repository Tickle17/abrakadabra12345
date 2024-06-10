package simple_it.routings.business.calendar

import io.ktor.server.application.*
import io.ktor.server.routing.*
import simple_it.models.calendar.calendarDAO.CalendarService

fun Application.calendarRout(calendarService: CalendarService) {
    routing {
        post("/calendar") {
            create(calendarService)
        }
        put("/calendar/{id}") {
            update(calendarService)
        }
        get("/calendar/{id}") {
            read(calendarService)
        }
        get("/calendars") {
            readAll(calendarService)
        }
        delete("/calendar/{id}") {
            delete(calendarService)
        }
    }
}