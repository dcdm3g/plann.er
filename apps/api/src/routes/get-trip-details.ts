import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function getTripDetails(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:id',
    {
      schema: { params: z.object({ id: z.string().uuid() }) },
    },
    async (req, rep) => {
      const { id } = req.params

      const trip = await prisma.trip.findUnique({
        where: { id },
        select: {
          destination: true,
          startsAt: true,
          endsAt: true,
          isConfirmed: true,
        },
      })

      if (!trip) {
        return rep.status(404).send({ message: 'Trip not found.' })
      }

      return { trip }
    },
  )
}
