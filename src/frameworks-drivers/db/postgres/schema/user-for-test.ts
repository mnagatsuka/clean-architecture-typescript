import { pgTable, text } from 'drizzle-orm/pg-core'

export const user_for_test = pgTable('user_for_test', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  status: text('status').notNull(),
})