package simple_it.models.chat.chatDTO

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime
import simple_it.models.business.businessDTO.Business
import simple_it.models.users.usersDTO.Users
import simple_it.models.vacancy.vacancyDTO.Vacancy
import java.time.LocalDateTime
import java.util.*

object ReactionsVacancy : Table() {
    val id = uuid("id").autoGenerate()
    val commentary = varchar("commentary", 999999).nullable()
    val invitation = bool("invitation").default(false)
    val control = bool("control").default(false)
    val userId = uuid("user_id").references(Users.id)
    val businessId = uuid("business_id").references(Business.id)
    val vacancyId = uuid("vacancy_id").references(Vacancy.id)
    val createdAt = datetime("created_at").default(LocalDateTime.now())
    val updatedAt = datetime("updated_at").default(LocalDateTime.now())
    val deletedAt = datetime("deleted_at").nullable()
    override val primaryKey = PrimaryKey(id)
}


@Serializable
data class ReactionsVacancyDTO(
    @Contextual val id: UUID? = null,
    val commentary: String? = null,
    val invitation: Boolean? = null,
    val control: Boolean? = null,
    @Contextual val userId: UUID,
    @Contextual val businessId: UUID,
    @Contextual val vacancyId: UUID,
    @Contextual val createdAt: LocalDateTime? = null,
    @Contextual val updatedAt: LocalDateTime? = null,
    @Contextual val deletedAt: LocalDateTime? = null
)

@Serializable
data class UpdateReactionsVacancy(
    @Contextual val id: UUID? = null,
    val commentary: String? = null,
    val invitation: Boolean? = null,
    val control: Boolean? = null,
)

@Serializable
data class ReactionsVacancyResultDTO(
    @Contextual val id: UUID,
    val message: String
)

@Serializable
data class ReactionsVacancyDetailsDTO(
    @Contextual val reactionId: UUID,
    @Contextual val userId: UUID,
    @Contextual val businessId: UUID,
    @Contextual val vacancyId: UUID,
    val vacancy: String,
    val position: String
)


object Messages : Table() {
    val id = uuid("id").autoGenerate()
    val reactionsVacancyId = uuid("reactionsVacancy_id").references(ReactionsVacancy.id)
    val senderType = varchar("sender_type", 10).check { it inList listOf("users", "business") }
    val senderId = uuid("sender_id")
    val message = text("message")
    val createdAt = datetime("created_at").default(LocalDateTime.now())
    val updatedAt = datetime("updated_at").default(LocalDateTime.now())
    val deletedAt = datetime("deleted_at").nullable()
    override val primaryKey = PrimaryKey(id)
}


@Serializable
data class MessageDTO(
    @Contextual val id: UUID? = null,
    @Contextual val reactionsVacancyId: UUID,
    val senderType: String,
    @Contextual val senderId: UUID,
    val message: String,
    @Contextual val createdAt: LocalDateTime? = null,
    @Contextual val updatedAt: LocalDateTime? = null,
    @Contextual val deletedAt: LocalDateTime? = null
)

@Serializable
data class MessagesDTO(
    @Contextual val id: UUID? = null,
    val senderType: String,
    val message: String,
    @Contextual val createdAt: LocalDateTime? = null,
    @Contextual val updatedAt: LocalDateTime? = null,
    @Contextual val deletedAt: LocalDateTime? = null
)

object DefaultMessages : Table() {
    val id = uuid("id").autoGenerate()
    val businessId = reference("business_id", Business.id).index()
    val name = varchar("name", 255)
    val message = text("message")
    val createdAt = datetime("created_at").default(LocalDateTime.now())
    val updatedAt = datetime("updated_at").default(LocalDateTime.now())
    val deletedAt = datetime("deleted_at").nullable()
    override val primaryKey = PrimaryKey(id)
}

@Serializable
data class DefaultMessageDTO(
    @Contextual val id: UUID? = null,
    @Contextual val businessId: UUID,
    val name: String,
    val message: String,
    @Contextual val createdAt: LocalDateTime? = null,
    @Contextual val updatedAt: LocalDateTime? = null,
    @Contextual val deletedAt: LocalDateTime? = null
)