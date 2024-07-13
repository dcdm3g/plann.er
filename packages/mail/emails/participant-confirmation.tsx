import {
  Html,
  Head,
  Font,
  Preview,
  Tailwind,
  Body,
  Text,
  Link,
} from '@react-email/components'
import { format } from 'date-fns'
import React from 'react'

interface ParticipantConfirmationTemplateProps {
  destination: string
  startsAt: Date
  endsAt: Date
  confirmationLink: string
}

export default function ParticipantConfirmationTemplate({
  destination = 'Florianopolis, Brazil',
  startsAt = new Date(2024, 8, 16),
  endsAt = new Date(2024, 8, 27),
  confirmationLink = 'http://localhost:3000/participants/foo/confirm',
}: ParticipantConfirmationTemplateProps) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
            format: 'woff2',
          }}
          fontStyle="normal"
        />
      </Head>

      <Preview>Confirm your participation</Preview>

      <Tailwind>
        <Body className="m-auto bg-white p-10">
          <Text className="m-0 text-black text-base tracking-wide">
            You have been invited to participate in a trip to{' '}
            <strong>{destination}</strong> on the dates of{' '}
            <strong>{format(startsAt, 'LLLL d, y')}</strong> to{' '}
            <strong>{format(endsAt, 'LLLL d, y')}</strong>.
          </Text>

          <Text className="mt-6 mb-0 text-black text-base tracking-wide">
            To confirm your presence on the trip, click on the link below:
          </Text>

          <Link
            className="block mt-6 mb-0 text-blue-400 text-base tracking-wide underline underline-offset-4"
            href={confirmationLink}
          >
            Confirm attendance
          </Link>

          <Text className="mt-6 mb-0 text-black text-base tracking-wide">
            If you don&apos;t know what this email is about or can&apos;t be
            present, just{' '}
            <span className="underline underline-offset-4">
              ignore this email
            </span>
            .
          </Text>
        </Body>
      </Tailwind>
    </Html>
  )
}
