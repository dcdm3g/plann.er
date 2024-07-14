import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function getParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/participants/:id',
    {
      schema: { params: z.object({ id: z.string().uuid() }) },
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
