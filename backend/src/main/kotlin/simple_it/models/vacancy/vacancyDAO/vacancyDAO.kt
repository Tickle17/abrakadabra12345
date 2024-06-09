package simple_it.models.vacancy.vacancyDAO

import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction
import simple_it.models.business.businessDTO.Business
import simple_it.models.enum.HardSkills
import simple_it.models.vacancy.vacancyDTO.Vacancy
import simple_it.models.vacancy.vacancyDTO.VacancyDTO
import java.util.*

class VacancyService(private val database: Database) {
    init {
        transaction(database) {
            SchemaUtils.create(Vacancy)
        }
    }

    fun toHardSkillsString(hardskills: List<HardSkills>?): String? {
        return hardskills?.joinToString(separator = ",") { it.name }
    }

    fun fromHardSkillsString(hardskillsString: String?): List<HardSkills>? {
        return hardskillsString?.split(",")?.mapNotNull {
            try {
                HardSkills.valueOf(it)
            } catch (e: IllegalArgumentException) {
                null
            }
        }
    }

    suspend fun isBusinessIdExists(businessId: UUID): Boolean = dbQuery {
        Business.select { Business.id eq businessId }.count() > 0
    }

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(vacancies: VacancyDTO): UUID = dbQuery {
        val businessId = vacancies.businessId
        if (!isBusinessIdExists(businessId)) {
            throw IllegalArgumentException("Business ID does not exist")
        }
        Vacancy.insert {
            requireNotNull(vacancies.vacancy) { "vacancy must not be null" }
            requireNotNull(vacancies.status) { "status must not be null" }
            requireNotNull(vacancies.businessId) { "id business must not be null" }
            it[vacancy] = vacancies.vacancy
            it[status] = vacancies.status
            it[hardSkills] = toHardSkillsString(vacancies.hardSkills)
            it[this.businessId] = vacancies.businessId
        }[Vacancy.id]
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
                        deletedAt = row[Vacancy.deletedAt],
                        hardSkills = fromHardSkillsString(row[Vacancy.hardSkills])
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
                it[hardSkills] = toHardSkillsString(vacancies.hardSkills)

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
            deletedAt = row[Vacancy.deletedAt],
            hardSkills = fromHardSkillsString(row[Vacancy.hardSkills])
        )
    }

    suspend fun delete(id: UUID) {
        dbQuery {
            Vacancy.deleteWhere { Vacancy.id.eq(id) }
        }
    }
}