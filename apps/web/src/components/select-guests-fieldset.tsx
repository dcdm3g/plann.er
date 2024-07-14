import type { Dispatch, SetStateAction, FormEvent } from 'react'
import { UserRoundPlus, ArrowRight, X, AtSign, Plus } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'

interface SelectGuestsFieldsetProps {
  emailsToInvite: string[]
  setEmailsToInvite: Dispatch<SetStateAction<string[]>>
}

export function SelectGuestsFieldset({
  emailsToInvite,
  setEmailsToInvite,
}: SelectGuestsFieldsetProps) {
  function addEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget

    const data = new FormData(form)
    const email = data.get('email')?.toString()

    if (!email || emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite((e) => [...e, email])
    form.reset()
  }

  function removeEmail(email: string) {
    setEmailsToInvite((e) =>
      e.filter((emailToInvite) => emailToInvite !== email),
    )
  }

  return (
    <Dialog.Root>
      <div className="flex h-16 w-full items-center gap-5 rounded-xl bg-zinc-900 pl-6 pr-4 shadow">
        <Dialog.Trigger className="flex flex-1 items-center gap-2">
          <UserRoundPlus className="size-5 flex-shrink-0 text-zinc-400" />

          <span className="text-lg text-zinc-400">
            Who will participate in the trip?
          </span>
        </Dialog.Trigger>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 hover:bg-lime-400"
        >
          Confirm trip <ArrowRight className="size-5" />
        </button>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />

        <Dialog.Content className="fixed left-1/2 top-1/2 flex w-[640px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-zinc-900 px-6 py-5 shadow">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-white">
              Select guests
            </Dialog.Title>

            <Dialog.Close>
              <X className="size-5 text-zinc-400" />
            </Dialog.Close>
          </div>

          <Dialog.Description className="mt-2 text-sm text-zinc-400">
            Guests will receive emails to confirm their participation in the
            trip.
          </Dialog.Description>

          <div className="mt-10 flex flex-col gap-10">
            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map((emailToInvite) => (
                <div
                  key={emailToInvite}
                  className="flex items-center gap-2.5 rounded-md bg-zinc-800 px-2.5 py-1.5"
                >
                  <p className="text-base text-zinc-300">{emailToInvite}</p>

                  <button onClick={() => removeEmail(emailToInvite)}>
                    <X className="size-4 text-zinc-400" />
                  </button>
                </div>
              ))}
            </div>

            <div className="h-px w-full bg-zinc-800" role="separator" />

            <form
              onSubmit={addEmail}
              className="flex items-center rounded-lg bg-zinc-950 py-2.5 pl-4 pr-3"
            >
              <label className="flex flex-1 items-center gap-2.5">
                <AtSign className="size-5 text-zinc-400" />

                <input
                  className="bg-transparent text-base placeholder-zinc-400 outline-none"
                  type="email"
                  name="email"
                  placeholder="Enter the guest's email"
                />
              </label>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 hover:bg-lime-400"
              >
                Invite <Plus className="size-5" />
              </button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
