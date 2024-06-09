package simple_it.routings.business

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.util.pipeline.*
import simple_it.models.business.businessDAO.BusinessService
import simple_it.models.business.businessDTO.BusinessDTO
import simple_it.models.business.businessDTO.CreateBusiness
import java.util.*

suspend fun PipelineContext<Unit, ApplicationCall>.create(
    businessService: BusinessService
) {
    try {
        val user = call.receive<CreateBusiness>()
        val id = businessService.create(user)
        call.respond(HttpStatusCode.Created, id)
    } catch (e: Throwable) {
        val errorMessage = "Error occurred: ${e.message}"
        call.respond(HttpStatusCode.BadRequest, errorMessage)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.editModel(
    businessService: BusinessService
) {
    val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
    val user = call.receive<BusinessDTO>()
    businessService.update(id, user)
    call.respond(HttpStatusCode.OK, user)
}

suspend fun PipelineContext<Unit, ApplicationCall>.findModel(
    businessService: BusinessService
) {
    val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
    val user = businessService.read(id)
    if (user != null) {
        call.respond(HttpStatusCode.OK, user)
    } else {
        call.respond(HttpStatusCode.NotFound)
    }
}

suspend fun PipelineContext<Unit, ApplicationCall>.delete(
    businessService: BusinessService
) {
    val id: UUID = UUID.fromString(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
    businessService.delete(id)
    call.respond(HttpStatusCode.OK)
}