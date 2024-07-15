import { fastify } from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import {
  jsonSchemaTransform,
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
import { getParticipant } from '@/routes/get-participant'
import { createInvite } from '@/routes/create-invite'
import { updateTrip } from '@/routes/update-trip'
import { getTripDetails } from '@/routes/get-trip-details'
import { env } from '@/env'

const app = fastify()

app.register(cors, { origin: env.WEBSITE_BASE_URL })

app.register(swagger, {
  openapi: {
    info: {
      title: 'Plann.er API',
      description: 'API for Plann.er built during NLW Journey.',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.register(swaggerUI, { routePrefix: '/docs' })

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
app.register(getParticipant)
app.register(createInvite)
app.register(updateTrip)
app.register(getTripDetails)

app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP server running on ${env.API_BASE_URL} 🚀`)
})
