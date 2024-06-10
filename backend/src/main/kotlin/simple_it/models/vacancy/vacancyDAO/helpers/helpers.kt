package simple_it.models.vacancy.vacancyDAO.helpers

import org.jetbrains.exposed.sql.ResultRow
import simple_it.models.enum.HardSkills
import simple_it.models.enum.SoftSkills
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
        position = row[Vacancy.position],
        workFormat = row[Vacancy.workFormat],
        specialization = row[Vacancy.specialization],
        experience = row[Vacancy.experience],
        vacancy = row[Vacancy.vacancy],
        address = row[Vacancy.address],
        softSkills = fromSoftSkillsString(row[Vacancy.softSkills]),
        hardSkills = fromHardSkillsString(row[Vacancy.hardSkills]),
        businessId = row[Vacancy.businessId],
        calendarId = row[Vacancy.calendarId],
    )
}