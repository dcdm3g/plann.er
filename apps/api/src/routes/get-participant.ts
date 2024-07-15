import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function getParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/participants/:id',
    {
      schema: {
        summary: 'Get a participant.',
        tags: ['participants'],
        params: z.object({ id: z.string().uuid() }),
        response: {
          200: z.object({
            participant: z.object({
              name: z.string().nullable(),
              email: z.string().email(),
              isConfirmed: z.boolean(),
            }),
          }),
          404: z.object({ message: z.literal('Participant not found.') }),
        },
      },
    },
    async (req, rep) => {
      const { id } = req.params

      const participant = await prisma.participant.findUnique({
        where: { id },
        select: {
          name: true,
          email: true,
          isConfirmed: true,
        },
      })

      if (!participant) {
        return rep.status(404).send({ message: 'Participant not found.' })
      }

      return { participant }
    },
  )
}
