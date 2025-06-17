// src/frameworks-drivers/database/seed.ts
import { db } from './client'
import { user as userTable } from './schema'
import { UserStatus } from '@entities/user/user-status'

async function seed() {
  await db.insert(userTable).values([
    {
      id: '1',
      name: 'Alice',
      email: 'alice@example.com',
      status: UserStatus.ACTIVE,
    },
    {
      id: '2',
      name: 'Bob',
      email: 'bob@example.com',
      status: UserStatus.INACTIVE,
    },
  ])

  console.log('✅ Seeding complete')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
