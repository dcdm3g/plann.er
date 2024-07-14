'use client'

import { useState } from 'react'
import { TripDetailsFieldset } from '@/components/trip-details-fieldset'
import { SelectGuestsFieldset } from '@/components/select-guests-fieldset'

export function CreateTripForm() {
  const [isGuestsFieldsetVisible, setIsGuestsFieldsetVisible] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  return (
    <form className="flex flex-col gap-4 self-stretch">
      <TripDetailsFieldset
        {...{ isGuestsFieldsetVisible, setIsGuestsFieldsetVisible }}
      />

      {isGuestsFieldsetVisible && (
        <SelectGuestsFieldset {...{ emailsToInvite, setEmailsToInvite }} />
      )}
    </form>
  )
}
