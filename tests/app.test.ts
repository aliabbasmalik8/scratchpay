import request from "supertest"
import app from "../src/app"

describe('app.ts', () => {
    it("should send back a response with 404 status", async() => {
        const response = await request(app).get("/")
        expect(response.status).toBe(404)
    })
})