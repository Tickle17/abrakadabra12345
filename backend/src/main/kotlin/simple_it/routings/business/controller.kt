package simple_it.routings.business

import io.ktor.server.application.*
import io.ktor.server.routing.*
import simple_it.models.business.businessDAO.BusinessService

fun Application.businessRout(businessService: BusinessService) {
    routing {
        // Create user
        post("/business") {
            create(businessService)
        }
        post("/loginBusiness") {
            loginBusiness(businessService)
        }
        // Update user
        put("/business/{id}") {
            editModel(businessService)
        }
        // Read user
        get("/business/{id}") {
            findModel(businessService)
        }
        // Delete user
        delete("/business/{id}") {
            delete(businessService)
        }
    }
}