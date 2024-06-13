package simple_it.models.users.userDAO

import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import simple_it.models.business.businessDTO.Business
import simple_it.models.users.usersDTO.*
import simple_it.models.vacancy.vacancyDAO.helpers.fromHardSkillsString
import simple_it.models.vacancy.vacancyDAO.helpers.fromSoftSkillsString
import simple_it.models.vacancy.vacancyDAO.helpers.toHardSkillsString
import simple_it.models.vacancy.vacancyDAO.helpers.toSoftSkillsString
import java.util.*

class UserService {

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }


    suspend fun create(user: CreateUser): UserIdRole = dbQuery {
        val insertStatement = Users.insert {
            requireNotNull(user.login) { "Login must not be null" }
            requireNotNull(user.password) { "Password must not be null" }
            it[login] = user.login
            it[password] = user.password
        }
        val result = insertStatement.resultedValues?.firstOrNull()
        UserIdRole(
            id = result?.get(Users.id) ?: throw Exception("Failed to retrieve inserted user ID"),
            role = result.get(Users.role)
        )
    }

    suspend fun readByLoginAndPassword(login: String, password: String): UserIdRole? {
        return dbQuery {
            Users.select { (Users.login eq login) and (Users.password eq password) }
                .singleOrNull()
                ?.let { UserIdRole(it[Users.id], it[Users.role]) }
                ?: Business.select { (Business.login eq login) and (Business.password eq password) }
                    .singleOrNull()
                    ?.let { UserIdRole(it[Business.id], it[Business.role]) }
        }
    }


    suspend fun update(id: UUID, user: UpdateUser) {
        dbQuery {
            Users.update({ Users.id eq id }) {
                it[photoUrl] = user.photoUrl
                it[fullName] = user.fullName
                it[age] = user.age
                it[stackTech] = user.stackTech
                it[projects] = user.projects
                it[gitlabUrl] = user.gitlabUrl
                it[githubUrl] = user.githubUrl
                it[aboutUser] = user.aboutUser
                it[targetsInfo] = user.targetsInfo
                it[price] = user.price
                it[criterionsJob] = user.criterionsJob
                it[phone] = user.phone
                it[hardSkills] = toHardSkillsString(user.hardSkills)
                it[softSkills] = toSoftSkillsString(user.softSkills)
            }
        }
    }

    suspend fun read(id: UUID): User? {
        return dbQuery {
            Users.select { Users.id eq id }
                .map { row ->
                    User(
                        id = row[Users.id],
                        login = row[Users.login],
                        password = row[Users.password],
                        photoUrl = row[Users.photoUrl],
                        fullName = row[Users.fullName],
                        age = row[Users.age],
                        stackTech = row[Users.stackTech],
                        projects = row[Users.projects],
                        gitlabUrl = row[Users.gitlabUrl],
                        githubUrl = row[Users.githubUrl],
                        aboutUser = row[Users.aboutUser],
                        targetsInfo = row[Users.targetsInfo],
                        price = row[Users.price],
                        criterionsJob = row[Users.criterionsJob],
                        phone = row[Users.phone],
                        softSkills = fromSoftSkillsString(row[Users.softSkills]),
                        hardSkills = fromHardSkillsString(row[Users.hardSkills]),
                        createdAt = row[Users.createdAt],
                        updatedAt = row[Users.updatedAt],
                        deletedAt = row[Users.deletedAt]
                    )
                }
                .singleOrNull()
        }
    }

    suspend fun getAllUsers(): List<Pair<UUID, String>> {
        return dbQuery {
            Users.selectAll().map { row ->
                Pair(row[Users.id], row[Users.login])
            }
        }
    }


    suspend fun delete(id: UUID) {
        dbQuery {
            Users.deleteWhere { Users.id.eq(id) }
        }
    }
}