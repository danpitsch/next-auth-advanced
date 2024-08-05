import { db, userRoles } from '.'

export const seedDatabase = async () => {
  try {
    const firstRole = await db.select().from(userRoles).limit(1)

    console.log('./db/seed.ts > seedDatabase() > firstRole:', firstRole)

    if (!firstRole || firstRole.length === 0) {
      console.error('creating default roles')
    } else {
      return firstRole.length;
    }

    return 0

    // const newRoles = await db
    //   .insert(userRoles)
    //   .values([
    //     {
    //       name: 'USER'
    //     },
    //     {
    //       name: 'ADMIN',
    //     },
    //   ])
    //   .returning()

    // console.log('User Roles added:', newRoles.length)

    // return newRoles.length

  } catch (error) {
    console.error('Failed to seed database:', error)
  }
}

seedDatabase()
