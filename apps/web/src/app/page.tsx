import { CreateTripForm } from '@/components/create-trip-form'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-pattern bg-center bg-no-repeat px-10 py-28">
      <main className="flex w-full max-w-3xl flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3">
          <Image src="/logo.svg" alt="Plann.er" width={157} height={33} />

          <h1 className="text-lg text-zinc-300">
            Invite your friends and plan your next trip!
          </h1>
        </div>

        <CreateTripForm />

        <p className="max-w-md text-center text-sm tracking-tight text-zinc-500">
          When planning your trip through plann.er you automatically agree with
          our{' '}
          <a className="text-zinc-300 underline underline-offset-4" href="#">
            terms of use
          </a>{' '}
          and{' '}
          <a className="text-zinc-300 underline underline-offset-4" href="#">
            privacy policies.
          </a>
        </p>
      </main>
    </div>
  )
}
