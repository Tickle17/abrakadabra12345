package simple_it.models.calendar.calendarDAO

import kotlinx.coroutines.Dispatchers
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import simple_it.models.calendar.calendarDTO.CreateVacancyCalendar
import simple_it.models.calendar.calendarDTO.VacancyCalendar
import simple_it.models.calendar.calendarDTO.VacancyCalendarDTO
import java.math.BigDecimal
import java.util.*

class CalendarService {

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(calendar: CreateVacancyCalendar): VacancyCalendarDTO = dbQuery {
        val slotsMath = Math.floorDiv(
            (calendar.dayEnd - calendar.dayStart).toInt(),
            (calendar.duration + calendar.freeTime).toInt()
        )

        val insertStatement = VacancyCalendar.insert {
            it[duration] = BigDecimal.valueOf(calendar.duration)
            it[freeTime] = BigDecimal.valueOf(calendar.freeTime)
            it[dayStart] = BigDecimal.valueOf(calendar.dayStart)
            it[dayEnd] = BigDecimal.valueOf(calendar.dayEnd)
//            it[freeSlots] = toFreeSlotsCalendarString(calendar.freeSlots)
            it[slots] = slotsMath
            it[maxReserveDays] = calendar.maxReservDays
            it[workingDays] = Json.encodeToString(calendar.workingDays)
            it[businessId] = calendar.businessId
            it[userId] = calendar.userId

        }
        val result = insertStatement.resultedValues?.firstOrNull()
        VacancyCalendarDTO(
            id = result?.get(VacancyCalendar.id) ?: throw Exception("Failed to retrieve inserted calendar ID"),
            duration = result.get(VacancyCalendar.duration).toDouble(),
            freeTime = result.get(VacancyCalendar.freeTime).toDouble(),
            dayStart = result.get(VacancyCalendar.dayStart).toDouble(),
            dayEnd = result.get(VacancyCalendar.dayEnd).toDouble(),
            slots = result.get(VacancyCalendar.slots),
//            freeSlots = fromFreeSlotsCalendarString(result.get(VacancyCalendar.freeSlots)) ?: emptyList(),
            maxReserveDays = result.get(VacancyCalendar.maxReserveDays),
            workingDays = Json.decodeFromString(result.get(VacancyCalendar.workingDays)),
            businessId = result.get(VacancyCalendar.businessId),
            userId = result.get(VacancyCalendar.userId)
        )
    }

    suspend fun read(id: UUID): VacancyCalendarDTO? = dbQuery {
        VacancyCalendar.select { VacancyCalendar.id eq id }
            .mapNotNull {
                VacancyCalendarDTO(
                    id = it[VacancyCalendar.id],
                    duration = it[VacancyCalendar.duration].toDouble(),
                    freeTime = it[VacancyCalendar.freeTime].toDouble(),
                    dayStart = it[VacancyCalendar.dayStart].toDouble(),
                    dayEnd = it[VacancyCalendar.dayEnd].toDouble(),
                    slots = it[VacancyCalendar.slots],
//                    freeSlots = fromFreeSlotsCalendarString(it[VacancyCalendar.freeSlots]) ?: emptyList(),
                    maxReserveDays = it[VacancyCalendar.maxReserveDays],
                    workingDays = Json.decodeFromString(it[VacancyCalendar.workingDays]),
                    businessId = it[VacancyCalendar.businessId],
                    userId = it[VacancyCalendar.userId]
                )
            }.singleOrNull()
    }

    suspend fun readAll(): List<VacancyCalendarDTO> = dbQuery {
        VacancyCalendar.selectAll().map {
            VacancyCalendarDTO(
                id = it[VacancyCalendar.id],
                duration = it[VacancyCalendar.duration].toDouble(),
                freeTime = it[VacancyCalendar.freeTime].toDouble(),
                dayStart = it[VacancyCalendar.dayStart].toDouble(),
                dayEnd = it[VacancyCalendar.dayEnd].toDouble(),
                slots = it[VacancyCalendar.slots],
//                freeSlots = fromFreeSlotsCalendarString(it[VacancyCalendar.freeSlots]) ?: emptyList(),
                maxReserveDays = it[VacancyCalendar.maxReserveDays],
                workingDays = Json.decodeFromString(it[VacancyCalendar.workingDays]),
                businessId = it[VacancyCalendar.businessId],
                userId = it[VacancyCalendar.userId]

            )
        }
    }

    suspend fun update(id: UUID, calendar: CreateVacancyCalendar): Boolean = dbQuery {
        val updatedRows = VacancyCalendar.update({ VacancyCalendar.id eq id }) {
            it[duration] = BigDecimal.valueOf(calendar.duration)
            it[freeTime] = BigDecimal.valueOf(calendar.freeTime)
            it[dayStart] = BigDecimal.valueOf(calendar.dayStart)
            it[dayEnd] = BigDecimal.valueOf(calendar.dayEnd)
//            it[freeSlots] = toFreeSlotsCalendarString(calendar.freeSlots)
            it[maxReserveDays] = calendar.maxReservDays
            it[workingDays] = Json.encodeToString(calendar.workingDays)
            it[businessId] = calendar.businessId
        }
        updatedRows > 0
    }

    suspend fun delete(id: UUID): Boolean = dbQuery {
        val deletedRows = VacancyCalendar.deleteWhere { VacancyCalendar.id eq id }
        deletedRows > 0
    }
}
