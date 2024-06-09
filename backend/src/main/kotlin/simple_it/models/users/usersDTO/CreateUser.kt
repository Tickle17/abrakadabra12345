package simple_it.models.users.usersDTO

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import java.time.LocalDateTime
import java.util.*

@Serializable
data class CreateUser(
    val login: String,
    val password: String
)

@Serializable
data class UpdateUser(
    val photoUrl: String? = null,
    val fullName: String? = null,
    val age: Int? = null,
    val stackTech: String? = null,
    val projects: String? = null,
    val gitlabUrl: String? = null,
    val githubUrl: String? = null,
    val aboutUser: String? = null,
    val targetsInfo: String? = null,
    val price: Int? = null,
    val criterionsJob: String? = null,
    val phone: String? = null
)

@Serializable
data class User(
    @Contextual val id: UUID?,
    val login: String,
    val password: String,
    val photoUrl: String? = null,
    val fullName: String? = null,
    val age: Int? = null,
    val stackTech: String?,
    val projects: String?,
    val gitlabUrl: String?,
    val githubUrl: String?,
    val aboutUser: String?,
    val targetsInfo: String?,
    val price: Int?,
    val criterionsJob: String?,
    val phone: String?,
    @Contextual val createdAt: LocalDateTime,
    @Contextual val updatedAt: LocalDateTime,
    @Contextual val deletedAt: LocalDateTime?
)

@Serializable
data class UserIdRole(@Contextual val id: UUID?, val role: String)
