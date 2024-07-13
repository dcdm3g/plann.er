import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function confirmTrip(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get(
      '/trips/:id/confirm',
      { schema: { params: z.object({ id: z.string().uuid() }) } },
      async (req) => {
        return { id: req.params.id }
      },
    )
}
