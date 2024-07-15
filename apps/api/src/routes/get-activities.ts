import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { differenceInDays, addDays, isSameDay } from 'date-fns'

export async function getActivities(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId/activities',
    {
      schema: {
        summary: 'Get the activities of a trip.',
        tags: ['trips'],
        params: z.object({ tripId: z.string().uuid() }),
        response: {
          200: z.object({
            days: z.array(
              z.object({
                date: z.date(),
                activities: z.array(
                  z.object({
                    id: z.string().uuid(),
                    title: z.string().min(4),
                    occursAt: z.date(),
                  }),
                ),
              }),
            ),
          }),
          404: z.object({ message: z.literal('Trip not found.') }),
        },
      },
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
        days: Array.from({ length: tripTotalDays + 1 }).map((_, index) => {
          const date = addDays(trip.startsAt, index)

          return {
            date,
            activities: trip.activities.filter((activity) =>
              isSameDay(date, activity.occursAt),
            ),
          }
        }),
      }
    },
  )
}
