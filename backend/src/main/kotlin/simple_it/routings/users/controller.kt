package simple_it.routings.users

import io.ktor.server.application.*
import io.ktor.server.routing.*
import simple_it.models.users.userDAO.UserService

fun Application.userRout(userService: UserService) {
    routing {
        // Create user
        post("/users") {
            create(userService)
        }
        post("/login") {
            loginUser(userService)
        }
        // Update user
        put("/users/{id}") {
            editModel(userService)
        }

        // Read user
        get("/users/{id}") {
            findModel(userService)
        }
        // Delete user
        delete("/users/{id}") {
            delete(userService)
        }
    }
}
