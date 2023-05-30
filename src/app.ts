import "reflect-metadata"

import express from "express"
import getRoutes from "./start/getRoutes"

const app = express()
getRoutes(app)

export default app