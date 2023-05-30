import "reflect-metadata"

import app from "./app"

const PORT = process.env.PORT || 3600
app.listen(PORT, () => console.log(`Coding Challenge started at localhost:${PORT}`))