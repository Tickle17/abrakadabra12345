package simple_it.models.users.usersDTO

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime
import simple_it.models.enum.HardSkills
import simple_it.models.enum.SoftSkills
import java.time.LocalDateTime
import java.util.*

object Users : Table() {
    val id = uuid("id").autoGenerate()
    val login = varchar("login", length = 50)
    val password = varchar("password", length = 50)
    val photoUrl = varchar("photo_url", length = 255).nullable()
    val fullName = varchar("full_name", length = 100).nullable()
    val age = integer("age").nullable()
    val projects = varchar("projects", length = 255).nullable()
    val gitlabUrl = varchar("gitlab_url", length = 255).nullable()
    val githubUrl = varchar("github_url", length = 255).nullable()
    val aboutUser = varchar("about_user", length = 255).nullable()
    val targetsInfo = varchar("targets_info", length = 255).nullable()
    val price = integer("price").nullable()
    val criterionsJob = varchar("criterions_job", length = 255).nullable()
    val role = varchar("role", length = 255).check { it inList listOf("users", "business") }.default("users")

    //        val companyWorkerId = varchar("company_worker_id", length = 50).references(Company.id).nullable()
    val phone = varchar("phone", length = 20).nullable()
    val softSkills = varchar("softSkills", 999999).nullable()
    val hardSkills = varchar("hardskills", length = 99999).nullable()
    val createdAt = datetime("created_at").default(LocalDateTime.now())
    val updatedAt = datetime("updated_at").default(LocalDateTime.now())
    val deletedAt = datetime("deleted_at").nullable()

    override val primaryKey = PrimaryKey(id)
}

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
    val projects: String? = null,
    val gitlabUrl: String? = null,
    val githubUrl: String? = null,
    val aboutUser: String? = null,
    val targetsInfo: String? = null,
    val price: Int? = null,
    val criterionsJob: String? = null,
    val phone: String? = null,
    val softSkills: List<SoftSkills>? = null,
    val hardSkills: List<HardSkills>? = null,
)

@Serializable
data class User(
    @Contextual val id: UUID?,
    val login: String,
    val password: String,
    val photoUrl: String? = null,
    val fullName: String? = null,
    val age: Int? = null,
    val projects: String?,
    val gitlabUrl: String?,
    val githubUrl: String?,
    val aboutUser: String?,
    val targetsInfo: String?,
    val price: Int?,
    val criterionsJob: String?,
    val phone: String?,
    val softSkills: List<SoftSkills>? = null,
    val hardSkills: List<HardSkills>? = null,
    @Contextual val createdAt: LocalDateTime,
    @Contextual val updatedAt: LocalDateTime,
    @Contextual val deletedAt: LocalDateTime?
)

@Serializable
data class UserIdRole(@Contextual val id: UUID?, val role: String)
