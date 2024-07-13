import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { env } from '@/env'
import { resend } from '@/lib/resend'
import { ParticipantConfirmationTemplate } from '@plann.er/mail'

export async function confirmTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:id/confirm',
    {
      schema: { params: z.object({ id: z.string().uuid() }) },
    },
    async (req, rep) => {
      const { id } = req.params

      const trip = await prisma.trip.findUnique({
        where: { id },
        include: {
          participants: {
            where: { isOwner: false },
          },
        },
      })

      if (!trip) {
        return rep.status(404).send({ message: 'Trip not found.' })
      }

      if (!trip.isConfirmed) {
        await prisma.trip.update({
          where: { id },
          data: { isConfirmed: true },
        })

        await Promise.all(
          trip.participants.map(
            async (participant) =>
              await resend.emails.send({
                from: 'Plann.er Team <hi@resend.dev>',
                to: participant.email,
                subject: '[Plann.er] Confirm your participation',
                react: ParticipantConfirmationTemplate({
                  destination: trip.destination,
                  startsAt: trip.startsAt,
                  endsAt: trip.endsAt,
                  confirmationLink: `${env.API_BASE_URL}/participants/${participant.id}/confirm`,
                }),
              }),
          ),
        )
      }

      return rep.redirect(`${env.WEBSITE_BASE_URL}/trips/${id}`)
    },
  )
}
