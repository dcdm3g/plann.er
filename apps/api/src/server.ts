import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import cors from '@fastify/cors'

import { createTrip } from '@/routes/create-trip'
import { confirmTrip } from './routes/confirm-trip'

const app = fastify()

app.register(cors, { origin: '*' })

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(createTrip)
app.register(confirmTrip)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Running 🚀')
})
