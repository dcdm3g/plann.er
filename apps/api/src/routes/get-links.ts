import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function getLinks(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId/links',
    {
      schema: {
        summary: 'Get the links of a trip.',
        tags: ['trips'],
        params: z.object({ tripId: z.string().uuid() }),
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string().uuid(),
                title: z.string().min(4),
                url: z.string().url(),
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
          links: {
            select: {
              id: true,
              title: true,
              url: true,
            },
          },
        },
      })

      if (!trip) {
        return rep.status(404).send({ message: 'Trip not found.' })
      }

      return { links: trip.links }
    },
  )
}
