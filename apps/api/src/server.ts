import { fastify } from 'fastify'
import cors from '@fastify/cors'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createTrip } from '@/routes/create-trip'
import { confirmTrip } from '@/routes/confirm-trip'
import { confirmParticipant } from '@/routes/confirm-participant'
import { createActivity } from '@/routes/create-activity'
import { getActivities } from '@/routes/get-activities'
import { createLink } from '@/routes/create-link'
import { getLinks } from '@/routes/get-links'
import { getParticipants } from '@/routes/get-participants'
import { createInvite } from '@/routes/create-invite'
import { updateTrip } from '@/routes/update-trip'
import { getTripDetails } from '@/routes/get-trip-details'
import { env } from '@/env'

const app = fastify()

app.register(cors, { origin: '*' })

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipant)
app.register(createActivity)
app.register(createLink)
app.register(getActivities)
app.register(getLinks)
app.register(getParticipants)
app.register(createInvite)
app.register(updateTrip)
app.register(getTripDetails)

app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP server running on ${env.API_BASE_URL} 🚀`)
})
