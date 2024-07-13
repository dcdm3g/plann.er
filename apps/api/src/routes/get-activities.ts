import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { differenceInDays, addDays, isSameDay } from 'date-fns'

export async function getActivities(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId/activities',
    {
      schema: { params: z.object({ tripId: z.string().uuid() }) },
    },
    async (req, rep) => {
      const { tripId } = req.params

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
        select: {
          startsAt: true,
          endsAt: true,
          activities: {
            select: {
              id: true,
              title: true,
              occursAt: true,
            },
          },
        },
      })

      if (!trip) {
        return rep.status(404).send({ message: 'Trip not found.' })
      }

      const tripTotalDays = differenceInDays(trip.endsAt, trip.startsAt)

      return {
        activities: Array.from({ length: tripTotalDays + 1 }).map(
          (_, index) => {
            const date = addDays(trip.startsAt, index)

            return {
              date,
              activities: trip.activities.filter((activity) =>
                isSameDay(date, activity.occursAt),
              ),
            }
          },
        ),
      }
    },
  )
}
