import 'reflect-metadata'
import './config/module-alias'
import app from './config/app'

const PORT = process.env.PORT ?? 5555

app.listen(PORT, () => { console.log(`Server running at http://localhost:${PORT}`) })
