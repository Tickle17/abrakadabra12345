package simple_it.models.vacancy.vacancyDAO

import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import simple_it.models.business.businessDTO.Business
import simple_it.models.vacancy.vacancyDAO.helpers.*
import simple_it.models.vacancy.vacancyDTO.Vacancy
import simple_it.models.vacancy.vacancyDTO.VacancyDTO
import java.util.*

class VacancyService {

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
            it[position] = vacancies.position
            it[workFormat] = vacancies.workFormat
            it[specialization] = vacancies.specialization
            it[experience] = vacancies.experience
            it[address] = vacancies.address
            it[hardSkills] = toHardSkillsString(vacancies.hardSkills)
            it[softSkills] = toSoftSkillsString(vacancies.softSkills)
            it[this.businessId] = vacancies.businessId
        }[Vacancy.id]
    }

    suspend fun read(id: UUID): VacancyDTO? {
        return dbQuery {
            Vacancy.select { Vacancy.id eq id }
                .map { row ->
                    VacancyDTO(
                        id = row[Vacancy.id],
                        status = row[Vacancy.status],
                        position = row[Vacancy.position],
                        workFormat = row[Vacancy.workFormat],
                        specialization = row[Vacancy.specialization],
                        experience = row[Vacancy.experience],
                        vacancy = row[Vacancy.vacancy],
                        address = row[Vacancy.address],
                        softSkills = fromSoftSkillsString(row[Vacancy.softSkills]),
                        hardSkills = fromHardSkillsString(row[Vacancy.hardSkills]),
                        businessId = row[Vacancy.businessId],
                        createdAt = row[Vacancy.createdAt],
                        updatedAt = row[Vacancy.updatedAt],
                        deletedAt = row[Vacancy.deletedAt],
                    )
                }
                .singleOrNull()
        }
    }

    suspend fun update(id: UUID, vacancies: VacancyDTO) {
        dbQuery {
            Vacancy.update({ Vacancy.id eq id }) {
                when (vacancies.status) {
                    null -> it[status] = "hidden"
                    else -> it[status] = vacancies.status
                }
                it[position] = vacancies.position
                it[workFormat] = vacancies.workFormat
                it[specialization] = vacancies.specialization
                it[experience] = vacancies.experience
                it[vacancy] = vacancies.vacancy
                it[address] = vacancies.address
                it[softSkills] = toSoftSkillsString(vacancies.softSkills)
                it[hardSkills] = toHardSkillsString(vacancies.hardSkills)
                it[businessId] = vacancies.businessId
            }
        }
    }

    suspend fun getAllVacancies(): List<VacancyDTO> {
        return dbQuery {
            Vacancy.selectAll().map { rowToVacancyDTO(it) }
        }
    }

    suspend fun delete(id: UUID) {
        dbQuery {
            Vacancy.deleteWhere { Vacancy.id.eq(id) }
        }
    }
}