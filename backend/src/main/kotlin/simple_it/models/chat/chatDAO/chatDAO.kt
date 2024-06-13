package simple_it.models.chat.chatDAO

import kotlinx.coroutines.Dispatchers
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.update
import simple_it.models.chat.chatDTO.*
import java.util.*

class ReactionsVacancyService {

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(reaction: ReactionsVacancyDTO): ReactionsVacancyResultDTO = dbQuery {

        val insertStatement = ReactionsVacancy.insert {
            it[commentary] = reaction.commentary
            it[invitation] = reaction.invitation ?: false
            it[control] = reaction.control ?: false
            it[userId] = reaction.userId
            it[businessId] = reaction.businessId
            it[vacancyId] = reaction.vacancyId
        }
        val result = insertStatement.resultedValues?.firstOrNull()
        val id = result?.get(ReactionsVacancy.id) ?: throw Exception("Failed to retrieve inserted reaction ID")
        ReactionsVacancyResultDTO(
            id = id,
            message = "Successfully reaction"
        )
    }

    suspend fun update(id: UUID, reaction: UpdateReactionsVacancy): Boolean = dbQuery {
        val updatedRows = ReactionsVacancy.update({ ReactionsVacancy.id eq id }) {
            it[commentary] = reaction.commentary
            it[invitation] = reaction.invitation ?: false
            it[control] = reaction.control ?: false
        }
        updatedRows > 0
    }
}

@Serializable
class MessagesService {

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun postMessage(messages: MessageDTO): ReactionsVacancyResultDTO = dbQuery {

        val insertStatement = Messages.insert {
            it[reactionsVacancyId] = messages.reactionsVacancyId
//         expected   "user", "business"
            it[senderType] = messages.senderType
            it[senderId] = messages.senderId
            it[message] = messages.message
        }
        val result = insertStatement.resultedValues?.firstOrNull()
        val id = result?.get(Messages.id) ?: throw Exception("Failed to retrieve inserted reaction ID")
        ReactionsVacancyResultDTO(
            id = id,
            message = "Successfully sent"
        )
    }

    suspend fun getMessagesByUserBusinessVacancy(userId: UUID, businessId: UUID, vacancyId: UUID): List<MessagesDTO> =
        dbQuery {
            (Messages innerJoin ReactionsVacancy)
                .select { (ReactionsVacancy.userId eq userId) and (ReactionsVacancy.businessId eq businessId) and (ReactionsVacancy.vacancyId eq vacancyId) }
                .map {
                    MessagesDTO(
                        id = it[Messages.id],
                        senderType = it[Messages.senderType],
                        message = it[Messages.message],
                        createdAt = it[Messages.createdAt],
                        updatedAt = it[Messages.updatedAt],
                        deletedAt = it[Messages.deletedAt]
                    )
                }
        }
}

//
class DefaultMessagesService {

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(defaultMessages: DefaultMessageDTO): ReactionsVacancyResultDTO = dbQuery {

        val insertStatement = DefaultMessages.insert {
            it[businessId] = defaultMessages.businessId
            it[name] = defaultMessages.name
            it[message] = defaultMessages.message
        }
        val result = insertStatement.resultedValues?.firstOrNull()
        val id = result?.get(DefaultMessages.id) ?: throw Exception("Failed to retrieve inserted reaction ID")
        ReactionsVacancyResultDTO(
            id = id,
            message = "Successfully reaction"
        )
    }
}