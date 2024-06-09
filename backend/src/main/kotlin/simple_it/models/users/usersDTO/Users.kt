package simple_it.models.users.usersDTO

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime
import java.time.LocalDateTime

object Users : Table() {
    val id = uuid("id").autoGenerate()
    val login = varchar("login", length = 50)
    val password = varchar("password", length = 50)
    val photoUrl = varchar("photo_url", length = 255).nullable()
    val fullName = varchar("full_name", length = 100).nullable()
    val age = integer("age").nullable()
    val stackTech = varchar("stack_tech", length = 255).nullable()
    val projects = varchar("projects", length = 255).nullable()
    val gitlabUrl = varchar("gitlab_url", length = 255).nullable()
    val githubUrl = varchar("github_url", length = 255).nullable()
    val aboutUser = varchar("about_user", length = 255).nullable()
    val targetsInfo = varchar("targets_info", length = 255).nullable()
    val price = integer("price").nullable()
    val criterionsJob = varchar("criterions_job", length = 255).nullable()
    val role = varchar("role", length = 255).default("User")

    //        val companyWorkerId = varchar("company_worker_id", length = 50).references(Company.id).nullable()
    val phone = varchar("phone", length = 20).nullable()
    val createdAt = datetime("created_at").default(LocalDateTime.now())
    val updatedAt = datetime("updated_at").default(LocalDateTime.now())
    val deletedAt = datetime("deleted_at").nullable()

    override val primaryKey = PrimaryKey(id)
}