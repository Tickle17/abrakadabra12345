package simple_it.models.calendar.calendarDTO

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.Table
import simple_it.models.business.businessDTO.Business
import simple_it.models.enum.DayOfWeek
import java.util.*

object VacancyCalendar : Table() {
    val id = uuid("id").autoGenerate()
    val duration = decimal("duration", 10, 2)
    val freeTime = decimal("freeTime", 10, 2)
    val dayStart = decimal("dayStart", 10, 2)
    val dayEnd = decimal("dayEnd", 10, 2)
    val slots = integer("slots")

    //    val freeSlots = varchar("freeSlots", length = 10000).nullable()
    val maxReservDays = integer("max_reserv_days")
    val workingDays = varchar("workingDays", 10000)
    val businessId = reference("business_id", Business.id, onDelete = ReferenceOption.CASCADE)

    override val primaryKey = PrimaryKey(id)
}

@Serializable
data class VacancyCalendarDTO(
    @Contextual val id: UUID? = null,
    val duration: Double,
    val freeTime: Double,
    val dayStart: Double,
    val dayEnd: Double,
    val slots: Int,
//    val freeSlots: List<VacancySlotDTO>,
    val maxReservDays: Int,
    val workingDays: List<WorkingDay>,
    @Contextual val businessId: UUID?,
)

@Serializable
data class CreateVacancyCalendar(
    val duration: Double,
    val freeTime: Double,
    val dayStart: Double,
    val dayEnd: Double,
//    val freeSlots: List<VacancySlotDTO>,
    val maxReservDays: Int,
    val workingDays: List<WorkingDay>,
    @Contextual val businessId: UUID,
)

@Serializable
data class WorkingDay(
    val day: DayOfWeek,
    val isWorking: Boolean
)
