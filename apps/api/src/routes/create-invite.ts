import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { ParticipantConfirmationTemplate } from '@plann.er/mail'
import { env } from '@/env'

export async function createInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips/:tripId/invites',
    {
      schema: {
        summary: 'Create an invite in a trip.',
        tags: ['trips'],
        params: z.object({ tripId: z.string().uuid() }),
        body: z.object({ email: z.string().email() }),
        response: {
          201: z.object({ id: z.string().uuid() }),
          404: z.object({ message: z.literal('Trip not found.') }),
        },
      },
    },
    async (req, rep) => {
      const { tripId } = req.params
      const { email } = req.body

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
      })

      if (!trip) {
        return rep.status(404).send({ message: 'Trip not found.' })
      }

      const { id } = await prisma.participant.create({
        data: { tripId, email },
      })

      await resend.emails.send({
        from: 'Plann.er Team <hi@resend.dev>',
        to: email,
        subject: '[Plann.er] Confirm your participation',
        react: ParticipantConfirmationTemplate({
          destination: trip.destination,
          startsAt: trip.startsAt,
          endsAt: trip.endsAt,
          confirmationLink: `${env.API_BASE_URL}/participants/${id}/confirm`,
        }),
      })

      return rep.status(201).send({ id })
    },
  )
}
