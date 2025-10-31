import { getPayload } from 'payload'
import config from './payload.config.js'

async function resetPassword() {
  try {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })

    console.log('Finding existing user...')
    const users = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (users.docs.length === 0) {
      console.log('No user found, creating new admin user...')
      const newUser = await payload.create({
        collection: 'users',
        data: {
          email: 'jt.connor88@gmail.com',
          password: 'ChainBlockM1!',
          role: 'admin',
        },
      })
      console.log('✅ Created new admin user:', newUser.email)
    } else {
      const userId = users.docs[0].id
      console.log('Found user:', users.docs[0].email, 'ID:', userId)

      console.log('Updating password...')
      const updated = await payload.update({
        collection: 'users',
        id: userId,
        data: {
          password: 'ChainBlockM1!',
        },
      })
      console.log('✅ Password updated for:', updated.email)
    }

    console.log('\nYou can now log in with:')
    console.log('Email: jt.connor88@gmail.com')
    console.log('Password: ChainBlockM1!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.error(error)
    process.exit(1)
  }
}

resetPassword()
