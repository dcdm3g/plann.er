import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { isBefore, isFuture } from 'date-fns'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import ConfirmationTemplate from 'transactional/emails/confirmation'

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips',
    {
      schema: {
        body: z
          .object({
            destination: z.string().min(4),
            startsAt: z.coerce.date().refine(isFuture),
            endsAt: z.coerce.date(),
            ownerName: z.string(),
            ownerEmail: z.string().email(),
            emailsToInvite: z.array(z.string().email()),
          })
          .refine((body) => isBefore(body.startsAt, body.endsAt)),
      },
    },
    async (req) => {
      const {
        destination,
        startsAt,
        endsAt,
        ownerName,
        ownerEmail,
        emailsToInvite,
      } = req.body

      const { id } = await prisma.trip.create({
        data: {
          destination,
          startsAt,
          endsAt,
          participants: {
            createMany: {
              data: [
                {
                  name: ownerName,
                  email: ownerEmail,
                  isOwner: true,
                  isConfirmed: true,
                },
              ],
              ...emailsToInvite.map((e) => ({ email: e })),
            },
          },
        },
      })

      await resend.emails.send({
        from: 'Plann.er Team <hi@resend.dev>',
        to: [ownerEmail],
        subject: '[Plann.er] Confirm your trip',
        react: ConfirmationTemplate({
          destination,
          startsAt,
          endsAt,
          confirmationLink: `http://localhost:3000/trips/${id}/confirm`,
        }),
      })

      return { id }
    },
  )
}
