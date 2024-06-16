package simple_it.models.chat.chatDAO

import kotlinx.coroutines.Dispatchers
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json.Default.decodeFromString
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import simple_it.models.business.businessDTO.Business
import simple_it.models.calendar.calendarDTO.VacancyCalendar
import simple_it.models.calendar.calendarDTO.VacancyCalendarDTO
import simple_it.models.chat.chatDTO.*
import simple_it.models.enum.DayOfWeek
import simple_it.models.slot.slotDTO.VacancySlot
import simple_it.models.slot.slotDTO.VacancySlotDTO
import simple_it.models.users.usersDTO.Users
import simple_it.models.vacancy.vacancyDTO.Vacancy
import java.util.*

class ReactionsVacancyService {

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(reaction: ReactionsVacancyDTO): ReactionsVacancyResultDTO = dbQuery {

        val insertStatement = ReactionsVacancy.insert {
            it[commentary] = reaction.commentary
            it[invitation] = reaction.invitation ?: false
            it[control] = reaction.control ?: false
            it[userId] = reaction.userId
            it[businessId] = reaction.businessId
            it[vacancyId] = reaction.vacancyId
        }
        val result = insertStatement.resultedValues?.firstOrNull()
        val id = result?.get(ReactionsVacancy.id) ?: throw Exception("Failed to retrieve inserted reaction ID")
        ReactionsVacancyResultDTO(
            id = id,
            message = "Successfully reaction"
        )
    }

    suspend fun update(id: UUID, reaction: UpdateReactionsVacancy): Boolean = dbQuery {
        val updatedRows = ReactionsVacancy.update({ ReactionsVacancy.id eq id }) {
            it[commentary] = reaction.commentary
            it[invitation] = reaction.invitation ?: false
            it[control] = reaction.control ?: false
        }
        updatedRows > 0
    }

    suspend fun findReactionsById(id: UUID): List<ReactionsVacancyDetailsDTO> = dbQuery {
        val userExists = Users.select { Users.id eq id }.count() > 0
        val businessExists = Business.select { Business.id eq id }.count() > 0

        val reactions = if (userExists) {
            ReactionsVacancy.select { ReactionsVacancy.userId eq id }
                .map {
                    Triple(
                        it[ReactionsVacancy.id],
                        it[ReactionsVacancy.vacancyId],
                        it[ReactionsVacancy.businessId]
                    )
                }
        } else if (businessExists) {
            ReactionsVacancy.select { ReactionsVacancy.businessId eq id }
                .map { Triple(it[ReactionsVacancy.id], it[ReactionsVacancy.vacancyId], it[ReactionsVacancy.userId]) }
        } else {
            emptyList()
        }

        reactions.mapNotNull { (reactionId, vacancyId, businessId) ->
            val vacancy = Vacancy
                .select { Vacancy.id eq vacancyId }
                .map { it[Vacancy.vacancy] to it[Vacancy.position] }
                .firstOrNull()

            val calendarData = if (userExists) {
                VacancyCalendar.select { VacancyCalendar.businessId eq businessId }
                    .map {
                        VacancyCalendarDTO(
                            id = it[VacancyCalendar.id],
                            duration = it[VacancyCalendar.duration].toDouble(),
                            freeTime = it[VacancyCalendar.freeTime].toDouble(),
                            dayStart = it[VacancyCalendar.dayStart].toDouble(),
                            dayEnd = it[VacancyCalendar.dayEnd].toDouble(),
                            slots = it[VacancyCalendar.slots],
                            maxReserveDays = it[VacancyCalendar.maxReserveDays],
                            workingDays = decodeFromString(it[VacancyCalendar.workingDays]),
                            businessId = it[VacancyCalendar.businessId],
                            userId = it[VacancyCalendar.userId]
                        )
                    }
                    .firstOrNull()
            } else {
                null
            }

            val vacancySlot = if (userExists) {
                VacancySlot
                    .select { (VacancySlot.vacancyId eq vacancyId) and (VacancySlot.userId eq id) }
                    .map {
                        VacancySlotDTO(
                            id = it[VacancySlot.id],
                            slot = it[VacancySlot.slot],
                            free = it[VacancySlot.free],
                            userId = it[VacancySlot.userId],
                            communication = it[VacancySlot.communication],
                            acceptingByUser = it[VacancySlot.acceptingByUser],
                            vacancyId = it[VacancySlot.vacancyId],
                            dayOfWeek = DayOfWeek.valueOf(it[VacancySlot.dayOfWeek]),
                            date = it[VacancySlot.date]
                        )
                    }
                    .firstOrNull()
            } else {
                VacancySlot
                    .select { VacancySlot.vacancyId eq vacancyId }
                    .map {
                        VacancySlotDTO(
                            id = it[VacancySlot.id],
                            slot = it[VacancySlot.slot],
                            free = it[VacancySlot.free],
                            userId = it[VacancySlot.userId],
                            communication = it[VacancySlot.communication],
                            acceptingByUser = it[VacancySlot.acceptingByUser],
                            vacancyId = it[VacancySlot.vacancyId],
                            dayOfWeek = DayOfWeek.valueOf(it[VacancySlot.dayOfWeek]),
                            date = it[VacancySlot.date]
                        )
                    }
                    .firstOrNull()
            }

            vacancy?.let { (vacancyName, position) ->
                ReactionsVacancyDetailsDTO(
                    reactionId = reactionId,
                    userId = if (userExists) id else businessId,
                    businessId = if (businessExists) id else businessId,
                    vacancyId = vacancyId,
                    vacancy = vacancyName ?: "Unknown vacancy",
                    position = position ?: "Unknown position",
                    calendarData = calendarData,
                    vacancySlot = vacancySlot
                )
            }
        }
    }


    suspend fun getAllReactions(): List<ReactionsVacancyDTO> = dbQuery {
        ReactionsVacancy.selectAll().map {
            ReactionsVacancyDTO(
                id = it[ReactionsVacancy.id],
                commentary = it[ReactionsVacancy.commentary],
                invitation = it[ReactionsVacancy.invitation],
                control = it[ReactionsVacancy.control],
                userId = it[ReactionsVacancy.userId],
                businessId = it[ReactionsVacancy.businessId],
                vacancyId = it[ReactionsVacancy.vacancyId]
            )
        }
    }
}

@Serializable
class MessagesService {

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun postMessage(messages: MessageDTO): ReactionsVacancyResultDTO = dbQuery {

        val insertStatement = Messages.insert {
            it[reactionsVacancyId] = messages.reactionsVacancyId
//         expected   "user", "business"
            it[senderType] = messages.senderType
            it[senderId] = messages.senderId
            it[message] = messages.message
        }
        val result = insertStatement.resultedValues?.firstOrNull()
        val id = result?.get(Messages.id) ?: throw Exception("Failed to retrieve inserted reaction ID")
        ReactionsVacancyResultDTO(
            id = id,
            message = "Successfully sent"
        )
    }

    suspend fun getMessagesByUserBusinessVacancy(userId: UUID, businessId: UUID, vacancyId: UUID): List<MessagesDTO> =
        dbQuery {
            (Messages innerJoin ReactionsVacancy)
                .select { (ReactionsVacancy.userId eq userId) and (ReactionsVacancy.businessId eq businessId) and (ReactionsVacancy.vacancyId eq vacancyId) }
                .map {
                    MessagesDTO(
                        id = it[Messages.id],
                        senderType = it[Messages.senderType],
                        message = it[Messages.message],
                        createdAt = it[Messages.createdAt],
                        updatedAt = it[Messages.updatedAt],
                        deletedAt = it[Messages.deletedAt]
                    )
                }
        }
}

//
class DefaultMessagesService {

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(defaultMessages: DefaultMessageDTO): ReactionsVacancyResultDTO = dbQuery {

        val insertStatement = DefaultMessages.insert {
            it[businessId] = defaultMessages.businessId
            it[name] = defaultMessages.name
            it[message] = defaultMessages.message
        }
        val result = insertStatement.resultedValues?.firstOrNull()
        val id = result?.get(DefaultMessages.id) ?: throw Exception("Failed to retrieve inserted reaction ID")
        ReactionsVacancyResultDTO(
            id = id,
            message = "Successfully reaction"
        )
    }
}