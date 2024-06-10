package simple_it.models.calendar.calendarDAO

import kotlinx.coroutines.Dispatchers
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction
import simple_it.models.calendar.calendarDTO.CreateVacancyCalendar
import simple_it.models.calendar.calendarDTO.VacancyCalendar
import simple_it.models.calendar.calendarDTO.VacancyCalendarDTO
import java.util.*

class CalendarService(private val database: Database) {

    init {
        transaction(database) {
            SchemaUtils.create(VacancyCalendar)
        }
    }

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(calendar: CreateVacancyCalendar): VacancyCalendarDTO = dbQuery {
        val slotsMath = Math.floorDiv(calendar.dayEnd - calendar.dayStart, calendar.duration + calendar.freeTime)

        val insertStatement = VacancyCalendar.insert {
            it[duration] = calendar.duration
            it[freeTime] = calendar.freeTime
            it[dayStart] = calendar.dayStart
            it[dayEnd] = calendar.dayEnd
//            it[freeSlots] = toFreeSlotsCalendarString(calendar.freeSlots)
            it[slots] = slotsMath
            it[maxReservDays] = calendar.maxReservDays
            it[workingDays] = Json.encodeToString(calendar.workingDays)
            it[businessId] = calendar.businessId
        }
        val result = insertStatement.resultedValues?.firstOrNull()
        VacancyCalendarDTO(
            id = result?.get(VacancyCalendar.id) ?: throw Exception("Failed to retrieve inserted calendar ID"),
            duration = result.get(VacancyCalendar.duration),
            freeTime = result.get(VacancyCalendar.freeTime),
            dayStart = result.get(VacancyCalendar.dayStart),
            dayEnd = result.get(VacancyCalendar.dayEnd),
            slots = result.get(VacancyCalendar.slots),
//            freeSlots = fromFreeSlotsCalendarString(result.get(VacancyCalendar.freeSlots)) ?: emptyList(),
            maxReservDays = result.get(VacancyCalendar.maxReservDays),
            workingDays = Json.decodeFromString(result.get(VacancyCalendar.workingDays)),
            businessId = result.get(VacancyCalendar.businessId)
        )
    }

    suspend fun read(id: UUID): VacancyCalendarDTO? = dbQuery {
        VacancyCalendar.select { VacancyCalendar.id eq id }
            .mapNotNull {
                VacancyCalendarDTO(
                    id = it[VacancyCalendar.id],
                    duration = it[VacancyCalendar.duration],
                    freeTime = it[VacancyCalendar.freeTime],
                    dayStart = it[VacancyCalendar.dayStart],
                    dayEnd = it[VacancyCalendar.dayEnd],
                    slots = it[VacancyCalendar.slots],
//                    freeSlots = fromFreeSlotsCalendarString(it[VacancyCalendar.freeSlots]) ?: emptyList(),
                    maxReservDays = it[VacancyCalendar.maxReservDays],
                    workingDays = Json.decodeFromString(it[VacancyCalendar.workingDays]),
                    businessId = it[VacancyCalendar.businessId]
                )
            }.singleOrNull()
    }

    suspend fun readAll(): List<VacancyCalendarDTO> = dbQuery {
        VacancyCalendar.selectAll().map {
            VacancyCalendarDTO(
                id = it[VacancyCalendar.id],
                duration = it[VacancyCalendar.duration],
                freeTime = it[VacancyCalendar.freeTime],
                dayStart = it[VacancyCalendar.dayStart],
                dayEnd = it[VacancyCalendar.dayEnd],
                slots = it[VacancyCalendar.slots],
//                freeSlots = fromFreeSlotsCalendarString(it[VacancyCalendar.freeSlots]) ?: emptyList(),
                maxReservDays = it[VacancyCalendar.maxReservDays],
                workingDays = Json.decodeFromString(it[VacancyCalendar.workingDays]),
                businessId = it[VacancyCalendar.businessId]
            )
        }
    }

    suspend fun update(id: UUID, calendar: CreateVacancyCalendar): Boolean = dbQuery {
        val updatedRows = VacancyCalendar.update({ VacancyCalendar.id eq id }) {
            it[duration] = calendar.duration
            it[freeTime] = calendar.freeTime
            it[dayStart] = calendar.dayStart
            it[dayEnd] = calendar.dayEnd
//            it[freeSlots] = toFreeSlotsCalendarString(calendar.freeSlots)
            it[maxReservDays] = calendar.maxReservDays
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
