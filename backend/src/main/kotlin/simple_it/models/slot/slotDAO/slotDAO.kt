package simple_it.models.slot.slotDAO

import kotlinx.coroutines.Dispatchers
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import simple_it.models.calendar.calendarDTO.VacancyCalendar
import simple_it.models.calendar.calendarDTO.VacancyCalendarDTO
import simple_it.models.enum.DayOfWeek
import simple_it.models.slot.slotDTO.CreateVacancySlotCalendar
import simple_it.models.slot.slotDTO.VacancyExpandedSlotDTO
import simple_it.models.slot.slotDTO.VacancySlot
import simple_it.models.slot.slotDTO.VacancySlotDTO
import simple_it.models.vacancy.vacancyDTO.Vacancy
import java.util.*

class CalendarSlotService {

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(calendarSlot: CreateVacancySlotCalendar): VacancySlotDTO = dbQuery {
        val insertStatement = VacancySlot.insert {
            it[slot] = calendarSlot.slot
            it[free] = calendarSlot.free
            it[userId] = calendarSlot.userId
            it[communication] = calendarSlot.communication
            it[acceptingByUser] = calendarSlot.acceptingByUser
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
                    vacancyId = it[VacancySlot.vacancyId],
                    dayOfWeek = Json.decodeFromString(it[VacancySlot.dayOfWeek]),
                    date = it[VacancySlot.date]
                )
            }.singleOrNull()
    }

    suspend fun readAll(): List<VacancyExpandedSlotDTO> = dbQuery {
        VacancySlot.selectAll().mapNotNull { vacancySlotRow ->
            val vacancyId = vacancySlotRow[VacancySlot.vacancyId]

            // Fetch Vacancy using vacancyId
            val vacancy = Vacancy.select { Vacancy.id eq vacancyId }.firstOrNull()

            if (vacancy != null) {
                val businessId = vacancy[Vacancy.businessId]

                // Fetch VacancyCalendar using businessId
                val vacancyCalendar = VacancyCalendar.select { VacancyCalendar.businessId eq businessId }.firstOrNull()

                VacancyExpandedSlotDTO(
                    id = vacancySlotRow[VacancySlot.id],
                    slot = vacancySlotRow[VacancySlot.slot],
                    free = vacancySlotRow[VacancySlot.free],
                    userId = vacancySlotRow[VacancySlot.userId],
                    communication = vacancySlotRow[VacancySlot.communication],
                    acceptingByUser = vacancySlotRow[VacancySlot.acceptingByUser],
                    vacancyId = vacancySlotRow[VacancySlot.vacancyId],
                    dayOfWeek = DayOfWeek.valueOf(vacancySlotRow[VacancySlot.dayOfWeek]),
                    date = vacancySlotRow[VacancySlot.date],
                    businessId = businessId,
                    vacancyCalendar = vacancyCalendar?.let {
                        VacancyCalendarDTO(
                            id = it[VacancyCalendar.id],
                            duration = it[VacancyCalendar.duration].toDouble(),
                            freeTime = it[VacancyCalendar.freeTime].toDouble(),
                            dayStart = it[VacancyCalendar.dayStart].toDouble(),
                            dayEnd = it[VacancyCalendar.dayEnd].toDouble(),
                            slots = it[VacancyCalendar.slots],
                            maxReserveDays = it[VacancyCalendar.maxReserveDays],
                            businessId = it[VacancyCalendar.businessId],
                            userId = it[VacancyCalendar.userId],
                            workingDays = Json.decodeFromString(it[VacancyCalendar.workingDays])
                        )
                    }
                )
            } else {
                null
            }
        }
    }

    suspend fun update(id: UUID, calendarSlot: CreateVacancySlotCalendar): Boolean = dbQuery {
        val updatedRows = VacancySlot.update({ VacancySlot.id eq id }) {
            it[slot] = calendarSlot.slot
            it[free] = calendarSlot.free
            it[userId] = calendarSlot.userId
            it[communication] = calendarSlot.communication
            it[acceptingByUser] = calendarSlot.acceptingByUser
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