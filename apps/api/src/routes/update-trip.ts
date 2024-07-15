import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { isBefore, isFuture } from 'date-fns'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function updateTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/trips/:id',
    {
      schema: {
        summary: 'Update the details of a trip.',
        tags: ['trips'],
        params: z.object({ id: z.string().uuid() }),
        body: z
          .object({
            destination: z.string().min(4),
            startsAt: z.coerce.date().refine(isFuture),
            endsAt: z.coerce.date(),
          })
          .refine((body) => isBefore(body.startsAt, body.endsAt)),
        response: {
          204: z.null(),
          404: z.object({ message: z.literal('Trip not found.') }),
        },
      },
    },
    async (req, rep) => {
      const { id } = req.params
      const { destination, startsAt, endsAt } = req.body

      const trip = await prisma.trip.findUnique({
        where: { id },
      })

      if (!trip) {
        return rep.status(404).send({ message: 'Trip not found.' })
      }

      await prisma.trip.update({
        where: { id },
        data: { destination, startsAt, endsAt },
      })

      return rep.status(204).send()
    },
  )
}
