import { Express, json } from "express"
import cors from "cors"
import { Routes } from "../constants/routes"
import { clinicRouter } from "../router/clinic"

const getRoutes = (app: Express) => {
    app.use(json())
    app.use(cors())
    app.use(Routes.CLINIC_ROUTES, clinicRouter)
}

export default getRoutes