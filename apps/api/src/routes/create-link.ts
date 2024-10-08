import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function createLink(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips/:tripId/links',
    {
      schema: {
        summary: 'Create a link in a trip.',
        tags: ['trips'],
        params: z.object({ tripId: z.string().uuid() }),
        body: z.object({ title: z.string().min(4), url: z.string().url() }),
        response: {
          201: z.object({ id: z.string().uuid() }),
          404: z.object({ message: z.literal('Trip not found.') }),
        },
      },
    },
    async (req, rep) => {
      const { tripId } = req.params
      const { title, url } = req.body

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
      })

      if (!trip) {
        return rep.status(404).send({ message: 'Trip not found.' })
      }

      const { id } = await prisma.link.create({
        data: { tripId, title, url },
      })

      return rep.status(201).send({ id })
    },
  )
}
