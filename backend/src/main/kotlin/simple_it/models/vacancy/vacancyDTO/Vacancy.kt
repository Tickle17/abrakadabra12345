package simple_it.models.vacancy.vacancyDTO

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime
import simple_it.models.business.businessDTO.Business
import java.time.LocalDateTime
import java.util.*

object Vacancy : Table() {
    val id = uuid("id").autoGenerate()
    val vacancy = varchar("vacancy", length = 99999).nullable()
    val status = varchar("status", length = 99999).nullable()
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
    @Contextual val businessId: UUID,
    @Contextual val createdAt: LocalDateTime? = null,
    @Contextual val updatedAt: LocalDateTime? = null,
    @Contextual val deletedAt: LocalDateTime? = null
)