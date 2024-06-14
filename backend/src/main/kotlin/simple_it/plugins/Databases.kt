package simple_it.plugins

import io.ktor.server.application.*
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction
import simple_it.models.business.businessDAO.BusinessService
import simple_it.models.business.businessDTO.Business
import simple_it.models.calendar.calendarDAO.CalendarService
import simple_it.models.calendar.calendarDTO.VacancyCalendar
import simple_it.models.chat.chatDAO.DefaultMessagesService
import simple_it.models.chat.chatDAO.MessagesService
import simple_it.models.chat.chatDAO.ReactionsVacancyService
import simple_it.models.chat.chatDTO.DefaultMessages
import simple_it.models.chat.chatDTO.Messages
import simple_it.models.chat.chatDTO.ReactionsVacancy
import simple_it.models.slot.slotDAO.CalendarSlotService
import simple_it.models.slot.slotDTO.VacancySlot
import simple_it.models.users.userDAO.UserService
import simple_it.models.users.usersDTO.Users
import simple_it.models.vacancy.vacancyDAO.VacancyService
import simple_it.models.vacancy.vacancyDTO.Vacancy
import simple_it.routings.business.businessRout
import simple_it.routings.business.calendar.calendarRout
import simple_it.routings.business.calendar.slots.calendarSlotsRout
import simple_it.routings.business.createVacancy.vacancyRout
import simple_it.routings.chats.chatRout
import simple_it.routings.users.userRout

fun Application.configureDatabases() {
    val database = Database.connect(
        url = environment.config.property("postgres.url").getString(),
        user = environment.config.property("postgres.user").getString(),
        password = environment.config.property("postgres.password").getString(),
        driver = "org.postgresql.Driver"
    )

    transaction(database) {
        SchemaUtils.create(
            Users, Business, Vacancy,
            VacancySlot, VacancyCalendar, ReactionsVacancy, Messages, DefaultMessages
        )
    }


    val userService = UserService()
    val businessService = BusinessService()
    val vacancyService = VacancyService()
    val calendarService = CalendarService()
    val calendarSlotService = CalendarSlotService()
    val reactionsVacancyService = ReactionsVacancyService()
    val messagesService = MessagesService()
    val defaultMessagesService = DefaultMessagesService()
    userRout(userService)
    businessRout(businessService)
    vacancyRout(vacancyService)
    calendarRout(calendarService)
    calendarSlotsRout(calendarSlotService)
    chatRout(reactionsVacancyService, messagesService, defaultMessagesService)
}

