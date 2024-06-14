package simple_it.models.vacancy.vacancyDAO.helpers

import org.jetbrains.exposed.sql.ResultRow
import simple_it.models.enum.HardSkills
import simple_it.models.enum.SoftSkills
import simple_it.models.enum.WorkFormat
import simple_it.models.vacancy.vacancyDTO.Vacancy
import simple_it.models.vacancy.vacancyDTO.VacancyDTO

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

fun toSoftSkillsString(softSkills: List<SoftSkills>?): String? {
    return softSkills?.joinToString(separator = ",") { it.name }
}

fun fromSoftSkillsString(softSkillsArray: String?): List<SoftSkills>? {
    return softSkillsArray?.split(",")?.mapNotNull {
        try {
            SoftSkills.valueOf(it)
        } catch (e: IllegalArgumentException) {
            null
        }
    }
}

fun rowToVacancyDTO(row: ResultRow): VacancyDTO {
    return VacancyDTO(
        id = row[Vacancy.id],
        status = row[Vacancy.status],
        vacancy = row[Vacancy.vacancy],
        position = row[Vacancy.position],
        workFormat = fromWorkFormatString(row[Vacancy.workFormat]),
        description = row[Vacancy.description],
        requirements = row[Vacancy.requirements],
        idealCandidate = row[Vacancy.idealCandidate],
        specialization = row[Vacancy.specialization],
        experience = row[Vacancy.experience],
        address = row[Vacancy.address],
        salaryMin = row[Vacancy.salaryMin],
        salaryMax = row[Vacancy.salaryMax],
        softSkills = fromSoftSkillsString(row[Vacancy.softSkills]),
        hardSkills = fromHardSkillsString(row[Vacancy.hardSkills]),
        businessId = row[Vacancy.businessId],
    )
}

fun toWorkFormatString(workFormat: List<WorkFormat>?): String? {
    return workFormat?.joinToString(separator = ",") { it.name }
}

fun fromWorkFormatString(workFormat: String?): List<WorkFormat>? {
    return workFormat?.split(",")?.mapNotNull {
        try {
            WorkFormat.valueOf(it)
        } catch (e: IllegalArgumentException) {
            null
        }
    }
}