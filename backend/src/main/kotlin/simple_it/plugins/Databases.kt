package simple_it.plugins

import io.ktor.server.application.*
import org.jetbrains.exposed.sql.Database
import simple_it.models.business.businessDAO.BusinessService
import simple_it.models.users.userDAO.UserService
import simple_it.routings.business.businessRout
import simple_it.routings.users.userRout

fun Application.configureDatabases() {
    val database = Database.connect(
        url = environment.config.property("postgres.url").getString(),
        user = environment.config.property("postgres.user").getString(),
        password = environment.config.property("postgres.password").getString(),
        driver = "org.postgresql.Driver"
    )

    val userService = UserService(database)
    val businessService = BusinessService(database)
    userRout(userService)
    businessRout(businessService)
}

