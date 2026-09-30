import { useEffect, useState } from 'react'

// Share the current draft with the completion indicators while keeping form edits local.
export function useProfileSection (initialValue, onChange) {
  const [draft, setDraft] = useState(initialValue)

  useEffect(() => {
    onChange?.(draft)
  }, [draft, onChange])

  return [draft, setDraft]
}
