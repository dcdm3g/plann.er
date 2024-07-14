import type { Dispatch, SetStateAction } from 'react'
import { MapPin, Calendar, Settings2, ArrowRight } from 'lucide-react'

interface TripDetailsFieldsetProps {
  isGuestsFieldsetVisible: boolean
  setIsGuestsFieldsetVisible: Dispatch<SetStateAction<boolean>>
}

export function TripDetailsFieldset({
  isGuestsFieldsetVisible,
  setIsGuestsFieldsetVisible,
}: TripDetailsFieldsetProps) {
  return (
    <div className="flex h-16 w-full items-center gap-5 rounded-xl bg-zinc-900 pl-6 pr-4 shadow">
      <label className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 flex-shrink-0 text-zinc-400" />

        <input
          className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
          type="text"
          placeholder="Where are you going?"
          disabled={isGuestsFieldsetVisible}
        />
      </label>

      <label className="flex basis-28 items-center gap-2">
        <Calendar className="size-5 flex-shrink-0 text-zinc-400" />

        <input
          className="bg-transparent text-lg placeholder-zinc-400 outline-none"
          type="text"
          placeholder="When?"
          disabled={isGuestsFieldsetVisible}
        />
      </label>

      <div role="none" className="h-6 w-px bg-zinc-800" />

      {isGuestsFieldsetVisible ? (
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-zinc-800 px-5 py-2 font-medium text-zinc-200 hover:bg-zinc-700"
          onClick={() => setIsGuestsFieldsetVisible(false)}
        >
          Change destination/date <Settings2 className="size-5" />
        </button>
      ) : (
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 hover:bg-lime-400"
          onClick={() => setIsGuestsFieldsetVisible(true)}
        >
          Continue <ArrowRight className="size-5" />
        </button>
      )}
    </div>
  )
}
