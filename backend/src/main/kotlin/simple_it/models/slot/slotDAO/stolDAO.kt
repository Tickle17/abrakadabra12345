package simple_it.models.slot.slotDAO

import kotlinx.coroutines.Dispatchers
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction
import simple_it.models.enum.DayOfWeek
import simple_it.models.slot.slotDTO.CreateVacancySlotCalendar
import simple_it.models.slot.slotDTO.VacancySlot
import simple_it.models.slot.slotDTO.VacancySlotDTO
import java.util.*

class CalendarSlotService(private val database: Database) {

    init {
        transaction(database) {
            SchemaUtils.create(VacancySlot)
        }
    }

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(calendarSlot: CreateVacancySlotCalendar): VacancySlotDTO = dbQuery {
        val insertStatement = VacancySlot.insert {
            it[slot] = calendarSlot.slot
            it[free] = calendarSlot.free
            it[userId] = calendarSlot.userId
            it[communication] = calendarSlot.communication
            it[acceptingByUser] = calendarSlot.acceptingByUser
            it[calendarId] = calendarSlot.calendarId
            it[vacancyId] = calendarSlot.vacancyId
            it[dayOfWeek] = calendarSlot.dayOfWeek.name
            it[date] = calendarSlot.date
        }
        val result = insertStatement.resultedValues?.firstOrNull()
        VacancySlotDTO(
            id = result?.get(VacancySlot.id) ?: throw Exception("Failed to retrieve inserted calendar ID"),
            slot = result.get(VacancySlot.slot),
            free = result.get(VacancySlot.free),
            userId = result.get(VacancySlot.userId),
            communication = result.get(VacancySlot.communication),
            acceptingByUser = result.get(VacancySlot.acceptingByUser),
            calendarId = result.get(VacancySlot.calendarId),
            vacancyId = result.get(VacancySlot.vacancyId),
            dayOfWeek = DayOfWeek.valueOf(result.get(VacancySlot.dayOfWeek)),
            date = result.get(VacancySlot.date)
        )
    }

    suspend fun read(id: UUID): VacancySlotDTO? = dbQuery {
        VacancySlot.select { VacancySlot.id eq id }
            .mapNotNull {
                VacancySlotDTO(
                    id = it[VacancySlot.id],
                    slot = it[VacancySlot.slot],
                    free = it[VacancySlot.free],
                    userId = it[VacancySlot.userId],
                    communication = it[VacancySlot.communication],
                    acceptingByUser = it[VacancySlot.acceptingByUser],
                    calendarId = it[VacancySlot.calendarId],
                    vacancyId = it[VacancySlot.vacancyId],
                    dayOfWeek = Json.decodeFromString(it[VacancySlot.dayOfWeek]),
                    date = it[VacancySlot.date]
                )
            }.singleOrNull()
    }

    suspend fun readAll(): List<VacancySlotDTO> = dbQuery {
        VacancySlot.selectAll().map {
            VacancySlotDTO(
                id = it[VacancySlot.id],
                slot = it[VacancySlot.slot],
                free = it[VacancySlot.free],
                userId = it[VacancySlot.userId],
                communication = it[VacancySlot.communication],
                acceptingByUser = it[VacancySlot.acceptingByUser],
                calendarId = it[VacancySlot.calendarId],
                vacancyId = it[VacancySlot.vacancyId],
                dayOfWeek = DayOfWeek.valueOf(it[VacancySlot.dayOfWeek]),
                date = it[VacancySlot.date]
            )
        }
    }

    suspend fun update(id: UUID, calendarSlot: CreateVacancySlotCalendar): Boolean = dbQuery {
        val updatedRows = VacancySlot.update({ VacancySlot.id eq id }) {
            it[slot] = calendarSlot.slot
            it[free] = calendarSlot.free
            it[userId] = calendarSlot.userId
            it[communication] = calendarSlot.communication
            it[acceptingByUser] = calendarSlot.acceptingByUser
            it[calendarId] = calendarSlot.calendarId
            it[vacancyId] = calendarSlot.vacancyId
            it[dayOfWeek] = calendarSlot.dayOfWeek.name
            it[date] = calendarSlot.date
        }
        updatedRows > 0
    }

    suspend fun delete(id: UUID): Boolean = dbQuery {
        val deletedRows = VacancySlot.deleteWhere { VacancySlot.id eq id }
        deletedRows > 0
    }
}