import { config } from 'dotenv'
import path from 'node:path'

// .env.test をルートから明示的に読み込む
config({ path: path.resolve(__dirname, '../', '.env.test') })