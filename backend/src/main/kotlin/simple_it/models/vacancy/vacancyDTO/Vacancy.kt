package simple_it.models.vacancy.vacancyDTO

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime
import simple_it.models.business.businessDTO.Business
import simple_it.models.enum.HardSkills
import simple_it.models.enum.SoftSkills
import simple_it.models.enum.WorkFormat
import java.time.LocalDateTime
import java.util.*

object Vacancy : Table() {
    val id = uuid("id").autoGenerate()
    val status = varchar("status", length = 99999).check { it inList listOf("active", "archived", "hidden") }
        .default("hidden")
    val position = varchar("position", 999999).nullable()
    val description = varchar("description", 999999).nullable()
    val requirements = varchar("requirements", 999999).nullable()
    val idealCandidate = varchar("ideal_candidate", 999999).nullable()
    val workFormat = varchar("work_format", 999999).nullable()
    val specialization = varchar("specialization", 999999).nullable()
    val experience = varchar("experience", 999999).nullable()
    val vacancy = varchar("vacancy", length = 99999).nullable()
    val address = varchar("address", 999999).nullable()
    val salaryMin = integer("salary_min").nullable()
    val salaryMax = integer("salary_max").nullable()
    val softSkills = varchar("softSkills", 999999).nullable()
    val hardSkills = varchar("hardSkills", length = 99999).nullable()
    val businessId = reference("business_id", Business.id, onDelete = ReferenceOption.CASCADE)
    val createdAt = datetime("created_at").default(LocalDateTime.now())
    val updatedAt = datetime("updated_at").default(LocalDateTime.now())
    val deletedAt = datetime("deleted_at").nullable()

    override val primaryKey = PrimaryKey(id)
}

@Serializable
data class VacancyDTO(
    @Contextual val id: UUID? = null,
    val vacancy: String? = null,
    val status: String? = null,
    val position: String? = null,
    val workFormat: List<WorkFormat>? = null,
    val description: String? = null,
    val requirements: String? = null,
    val idealCandidate: String? = null,
    val specialization: String? = null,
    val experience: String? = null,
    val address: String? = null,
    val salaryMin: Int? = null,
    val salaryMax: Int? = null,
    val softSkills: List<SoftSkills>? = null,
    val hardSkills: List<HardSkills>? = null,
    @Contextual val businessId: UUID,
    @Contextual val createdAt: LocalDateTime? = null,
    @Contextual val updatedAt: LocalDateTime? = null,
    @Contextual val deletedAt: LocalDateTime? = null
)