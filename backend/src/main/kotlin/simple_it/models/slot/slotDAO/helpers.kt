package simple_it.models.slot.slotDAO

import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import simple_it.models.enum.DayOfWeek
import simple_it.models.slot.slotDTO.VacancySlotDTO

fun toFreeSlotsCalendarString(calendarSlot: List<VacancySlotDTO>?): String? {
    return calendarSlot?.let { Json.encodeToString(it) }
}

fun fromFreeSlotsCalendarString(calendarSlotArray: String?): List<VacancySlotDTO>? {
    return calendarSlotArray?.let { Json.decodeFromString<List<VacancySlotDTO>>(it) }
}

fun toDayWeekString(dayOfWeek: List<DayOfWeek>?): String {
    return dayOfWeek.let { Json.encodeToString(it) }
}

fun fromDayWeekString(dayOfWeekArray: String?): List<DayOfWeek>? {
    return dayOfWeekArray?.let { Json.decodeFromString<List<DayOfWeek>>(it) }
}