import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { isWithinInterval } from 'date-fns'

export async function createActivity(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips/:tripId/activities',
    {
      schema: {
        params: z.object({ tripId: z.string().uuid() }),
        body: z.object({
          title: z.string().min(4),
          occursAt: z.coerce.date(),
        }),
      },
    },
    async (req, rep) => {
      const { tripId } = req.params
      const { title, occursAt } = req.body

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
      })

      if (!trip) {
        return rep.status(404).send({ message: 'Trip not found.' })
      }

      if (
        !isWithinInterval(occursAt, { start: trip.startsAt, end: trip.endsAt })
      ) {
        return rep.status(400).send({ message: 'Invalid activity date.' })
      }

      const { id } = await prisma.activity.create({
        data: { tripId, title, occursAt },
      })

      return rep.status(201).send({ id })
    },
  )
}
