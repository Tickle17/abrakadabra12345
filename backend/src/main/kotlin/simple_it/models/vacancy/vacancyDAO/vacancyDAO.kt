package simple_it.models.vacancy.vacancyDAO

import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction
import simple_it.models.users.usersDTO.Users
import simple_it.models.vacancy.vacancyDTO.Vacancy
import simple_it.models.vacancy.vacancyDTO.VacancyDTO
import java.util.*

class VacancyService(private val database: Database) {
    init {
        transaction(database) {
            SchemaUtils.create(Vacancy)
        }
    }

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(vacancies: VacancyDTO): UUID = dbQuery {
        Vacancy.insert {
            requireNotNull(vacancies.vacancy) { "Login must not be null" }
            requireNotNull(vacancies.status) { "Password must not be null" }
            it[vacancy] = vacancies.vacancy
            it[status] = vacancies.status
        }[Users.id]
    }


    suspend fun read(id: UUID): VacancyDTO? {
        return dbQuery {
            Vacancy.select { Vacancy.id eq id }
                .map { row ->
                    VacancyDTO(
                        id = row[Vacancy.id],
                        vacancy = row[Vacancy.vacancy],
                        status = row[Vacancy.status],
                        businessId = row[Vacancy.businessId],
                        createdAt = row[Vacancy.createdAt],
                        updatedAt = row[Vacancy.updatedAt],
                        deletedAt = row[Vacancy.deletedAt]
                    )
                }
                .singleOrNull()
        }
    }

    suspend fun update(id: UUID, vacancies: VacancyDTO) {
        dbQuery {
            Vacancy.update({ Vacancy.id eq id }) {
                it[vacancy] = vacancies.vacancy
                it[status] = vacancies.status
                it[businessId] = vacancies.businessId
            }
        }
    }

    suspend fun getAllVacancies(): List<VacancyDTO> {
        return dbQuery {
            Vacancy.selectAll().map { rowToVacancyDTO(it) }
        }
    }

    private fun rowToVacancyDTO(row: ResultRow): VacancyDTO {
        return VacancyDTO(
            id = row[Vacancy.id],
            vacancy = row[Vacancy.vacancy],
            businessId = row[Vacancy.businessId],
            createdAt = row[Vacancy.createdAt],
            updatedAt = row[Vacancy.updatedAt],
            deletedAt = row[Vacancy.deletedAt]
        )
    }

    suspend fun delete(id: UUID) {
        dbQuery {
            Vacancy.deleteWhere { Vacancy.id.eq(id) }
        }
    }
}