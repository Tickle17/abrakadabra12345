package simple_it.models.business.businessDTO

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime
import java.time.LocalDateTime
import java.util.*

object Business : Table() {
    val id = uuid("id").autoGenerate()
    val login = varchar("login", length = 50)
    val password = varchar("password", length = 50)
    val fullName = varchar("full_name", length = 100).nullable()
    val photoUrl = varchar("photo_url", length = 255).nullable()
    val description = varchar("about_business", length = 255).nullable()

    val createdAt = datetime("created_at").default(LocalDateTime.now())
    val updatedAt = datetime("updated_at").default(LocalDateTime.now())
    val deletedAt = datetime("deleted_at").nullable()

    override val primaryKey = PrimaryKey(id)
}

@Serializable
data class CreateBusiness(
    val login: String,
    val password: String
)

@Serializable
data class BusinessDTO(
    @Contextual val id: UUID? = null,
    val login: String? = null,
    val password: String? = null,
    val fullName: String? = null,
    val photoUrl: String? = null,
    val description: String? = null,
    @Contextual val createdAt: LocalDateTime? = null,
    @Contextual val updatedAt: LocalDateTime? = null,
    @Contextual val deletedAt: LocalDateTime? = null
)