import * as dotenv from 'dotenv'
import * as path from 'path'

const parsed = dotenv.config({path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`)}).parsed

export default parsed