package simple_it.models.slot.slotDTO

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.Table
import simple_it.models.enum.DayOfWeek
import simple_it.models.users.usersDTO.Users
import simple_it.models.vacancy.vacancyDTO.Vacancy
import java.util.*

object VacancySlot : Table() {
    val id = uuid("id").autoGenerate()
    val slot = integer("slot")
    val free = bool("free")
    val userId = reference("user_id", Users.id).nullable().uniqueIndex()
    val communication = varchar("communication", 255)
    val acceptingByUser = bool("accepting_by_user").default(false)
    val vacancyId = reference("vacancy_id", Vacancy.id, onDelete = ReferenceOption.SET_NULL)
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
    val date: String
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