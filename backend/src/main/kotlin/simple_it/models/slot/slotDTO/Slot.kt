package simple_it.models.slot.slotDTO

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table
import simple_it.models.calendar.calendarDTO.VacancyCalendarDTO
import simple_it.models.enum.DayOfWeek
import simple_it.models.users.usersDTO.Users
import simple_it.models.vacancy.vacancyDTO.Vacancy
import java.util.*

object VacancySlot : Table() {
    val id = uuid("id").autoGenerate()
    val slot = integer("slot")
    val free = bool("free")
    val userId = uuid("user_id").references(Users.id).nullable()
    val communication = varchar("communication", 255)
    val acceptingByUser = bool("accepting_by_user").default(false)
    val vacancyId = uuid("vacancy_id").references(Vacancy.id).nullable()
    val dayOfWeek = varchar("day_of_week", length = 99999)
    val date = varchar("date", 99999)
    override val primaryKey = PrimaryKey(id)
}

@Serializable
data class VacancySlotDTO(
    @Contextual val id: UUID? = null,
    val slot: Int,
    val free: Boolean,
    @Contextual val userId: UUID?,
    val communication: String,
    val acceptingByUser: Boolean,
    @Contextual val vacancyId: UUID,
    val dayOfWeek: DayOfWeek,
    val date: String,
)

@Serializable
data class VacancyExpandedSlotDTO(
    @Contextual val id: UUID? = null,
    val slot: Int,
    val free: Boolean,
    @Contextual val userId: UUID?,
    val communication: String,
    val acceptingByUser: Boolean,
    @Contextual val vacancyId: UUID,
    val dayOfWeek: DayOfWeek,
    val date: String,
    @Contextual val businessId: UUID?,
    val vacancyCalendar: VacancyCalendarDTO?
)

@Serializable
data class CreateVacancySlotCalendar(
    val slot: Int,
    val free: Boolean,
    @Contextual val userId: UUID?,
    val communication: String,
    val acceptingByUser: Boolean,
    @Contextual val vacancyId: UUID,
    val dayOfWeek: DayOfWeek,
    val date: String
)