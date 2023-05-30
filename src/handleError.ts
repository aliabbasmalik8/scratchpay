import { RequestHandler } from 'express';

const handleError = (callback: RequestHandler): RequestHandler => async (req, res, next) => {
    try {
        await callback(req, res, next)
    } catch (error: any) {
        if(error.name == "ValidationError") return res.status(400).send({ error: error.errors[0] })
        console.error(error)
        res.status(500).send({ error: "Internal Server Error" })
    }
}

export default handleError