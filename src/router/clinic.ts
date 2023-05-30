import { Router } from "express"
import Container from "typedi"
import ClinicController from "../clinic/clinic.controller"

const clinicRouter = Router()

const clinicController = Container.get(ClinicController)

clinicRouter.get("/", clinicController.getClinics)

export { clinicRouter }