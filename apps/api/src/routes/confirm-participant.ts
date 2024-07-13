import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { env } from '@/env'

export async function confirmParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/participants/:id/confirm',
    {
      schema: { params: z.object({ id: z.string().uuid() }) },
    },
    async (req, rep) => {
      const { id } = req.params

      const participant = await prisma.participant.findUnique({
        where: { id },
      })

      if (!participant) {
        return rep.status(404).send({ message: 'Participant not found.' })
      }

      if (!participant.isConfirmed) {
        await prisma.participant.update({
          where: { id },
          data: { isConfirmed: true },
        })
      }

      return rep.redirect(`${env.WEBSITE_BASE_URL}/trips/${participant.tripId}`)
    },
  )
}
