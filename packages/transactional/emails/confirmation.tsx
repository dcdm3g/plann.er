import {
  Html,
  Head,
  Font,
  Preview,
  Tailwind,
  Body,
  Text,
  Link,
  Hr,
  Img,
} from '@react-email/components'
import { format } from 'date-fns'

interface ConfirmationTemplateProps {
  destination: string
  startsAt: Date
  endsAt: Date
  confirmationLink: string
}

export default function ConfirmationTemplate({
  destination = 'Florianópolis, Brasil',
  startsAt = new Date(2024, 8, 16),
  endsAt = new Date(2024, 8, 27),
  confirmationLink = 'http://localhost:3000/trips/foo/confirm',
}: ConfirmationTemplateProps) {
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

      <Preview>Confirm your trip</Preview>

      <Tailwind>
        <Body className="m-auto bg-white font-sans p-[40px]">
          <div className="flex flex-col gap-[25.2px]">
            <Text className="m-0 text-black text-[16px] leading-[160%] tracking-[0.4px]">
              You requested the creation of a trip to{' '}
              <strong>{destination}</strong> on the dates of{' '}
              <strong>{format(startsAt, 'LLLL d, y')}</strong> to{' '}
              <strong>{format(endsAt, 'LLLL d, y')}</strong>.
            </Text>

            <Text className="m-0 text-black text-[16px] leading-[160%] tracking-[0.4px]">
              To confirm your trip, click on the link below:
            </Text>

            <Link
              className="m-0 text-blue-400 text-[16px] leading-[160%] tracking-[0.4px] underline underline-offset-4"
              href={confirmationLink}
            >
              Confirm trip
            </Link>

            <Text className="m-0 text-black text-[16px] leading-[160%] tracking-[0.4px]">
              If you don&apos;t know what this email is about, just{' '}
              <span className="underline underline-offset-4">
                ignore this email
              </span>
              .
            </Text>
          </div>

          <Hr className="h-px w-full bg-[#E4E4E7] my-[20px]" />

          <Img
            src="/static/logo.png"
            width={88.04}
            height={20}
            alt="Plann.er"
          />
        </Body>
      </Tailwind>
    </Html>
  )
}
