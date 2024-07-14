import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function getParticipants(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId/participants',
    {
      schema: { params: z.object({ tripId: z.string().uuid() }) },
    },
    async (req, rep) => {
      const { tripId } = req.params

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
        select: {
          participants: {
            select: {
              id: true,
              name: true,
              email: true,
              isConfirmed: true,
            },
          },
        },
      })

      if (!trip) {
        return rep.status(404).send({ message: 'Trip not found.' })
      }

      return { participants: trip.participants }
    },
  )
}
