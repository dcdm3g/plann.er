import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function getTripDetails(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:id',
    {
      schema: {
        summary: 'Get the details of a trip.',
        tags: ['trips'],
        params: z.object({ id: z.string().uuid() }),
        response: {
          200: z.object({
            trip: z.object({
              destination: z.string().min(4),
              startsAt: z.date(),
              endsAt: z.date(),
              isConfirmed: z.boolean(),
            }),
          }),
          404: z.object({ message: z.literal('Trip not found.') }),
        },
      },
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
