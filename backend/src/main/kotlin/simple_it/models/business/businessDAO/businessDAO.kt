package simple_it.models.business.businessDAO

import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction
import simple_it.models.business.businessDTO.Business
import simple_it.models.business.businessDTO.BusinessDTO
import simple_it.models.business.businessDTO.CreateBusiness
import simple_it.models.users.usersDTO.UserIdRole
import java.util.*

class BusinessService(private val database: Database) {

    init {
        transaction(database) {
            SchemaUtils.create(Business)
        }
    }

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(user: CreateBusiness): UserIdRole = dbQuery {
        val insertStatement = Business.insert {
            requireNotNull(user.login) { "Login must not be null" }
            requireNotNull(user.password) { "Password must not be null" }
            it[login] = user.login
            it[password] = user.password
        }
        val result = insertStatement.resultedValues?.firstOrNull()
        UserIdRole(
            id = result?.get(Business.id) ?: throw Exception("Failed to retrieve inserted user ID"),
            role = result.get(Business.role)
        )
    }

    suspend fun update(id: UUID, user: BusinessDTO) {
        dbQuery {
            Business.update({ Business.id eq id }) {
                it[photoUrl] = user.photoUrl
                it[fullName] = user.fullName
                it[description] = user.description
            }
        }
    }

    suspend fun read(id: UUID): BusinessDTO? {
        return dbQuery {
            Business.select { Business.id eq id }
                .map { row ->
                    BusinessDTO(
                        id = row[Business.id],
                        login = row[Business.login],
                        password = row[Business.password],
                        photoUrl = row[Business.photoUrl],
                        fullName = row[Business.fullName],
                        description = row[Business.description],
                        createdAt = row[Business.createdAt],
                        updatedAt = row[Business.updatedAt],
                        deletedAt = row[Business.deletedAt]
                    )
                }
                .singleOrNull()
        }
    }

    suspend fun getAllUsers(): List<Pair<UUID, String>> {
        return dbQuery {
            Business.selectAll().map { row ->
                Pair(row[Business.id], row[Business.login])
            }
        }
    }


    suspend fun delete(id: UUID) {
        dbQuery {
            Business.deleteWhere { Business.id.eq(id) }
        }
    }
}