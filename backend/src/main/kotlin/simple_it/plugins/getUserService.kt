package simple_it.plugins

import io.ktor.server.application.*
import org.jetbrains.exposed.sql.Database
import simple_it.models.users.userDAO.UserService

fun Application.userService(database: Database): UserService {
    return UserService(database)
}