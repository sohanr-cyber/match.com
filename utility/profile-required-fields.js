export function showMissingRequiredFields (form, fields, locale) {
  if (!form) return false
  const bn = locale === 'bn'
  const normalized = value => String(value || '').replace(/\s*\(.*?\)\s*/g, '').replace(/\s+/g, ' ').trim().toLocaleLowerCase()
  const containers = Array.from(form.querySelectorAll('[class*="field"]')).filter(element => element.querySelector('label'))
  const used = new Set()
  const missing = fields.filter(field => {
    const value = field.value
    return value === undefined || value === null || value === '' || value === false ||
      (typeof value === 'string' && /^(not selected|select|choose one)$/i.test(value.trim())) ||
      (Array.isArray(value) && value.length === 0)
  })
  const matched = missing.map(field => {
    const wanted = normalized(field.label)
    const container = containers.find(element => {
      if (used.has(element)) return false
      const label = normalized(element.querySelector('label')?.textContent)
      return label === wanted
    })
    if (container) {
      used.add(container)
      container.classList.add('profileFieldMissing')
      container.dataset.validationType = container.querySelector('[class*="options"]') ? 'choice' : 'input'
      const control = container.querySelector('input, select, textarea, button, [tabindex]') || container.querySelector('[class*="options"] span')
      if (control) {
        control.setAttribute('aria-invalid', 'true')
        control.setAttribute('aria-describedby', 'profile-required-fields')
      }
    }
    return field.label
  })
  let summary = form.querySelector('#profile-required-fields')
  if (!matched.length) {
    if (summary) summary.remove()
    return false
  }
  if (!summary) {
    summary = document.createElement('div')
    summary.id = 'profile-required-fields'
    summary.className = 'profileRequiredSummary'
    summary.setAttribute('role', 'alert')
    summary.setAttribute('aria-live', 'assertive')
    form.prepend(summary)
    if (!form.dataset.validationBound) {
      form.dataset.validationBound = 'true'
      const clearCompleted = event => {
        const target = event.target
        const container = target.closest?.('[class*="field"]')
        if (!container?.classList.contains('profileFieldMissing')) return
        const isComplete = container.dataset.validationType === 'choice'
          ? Boolean(container.querySelector('[class*="options"] [data-selected="true"]'))
          : Array.from(container.querySelectorAll('input, select, textarea')).every(control => {
              const value = control.value.trim()
              return Boolean(value) && !(control.tagName === 'SELECT' && /not selected/i.test(value))
            })
        if (!isComplete) return
        container.classList.remove('profileFieldMissing')
        container.querySelectorAll('[aria-invalid="true"]').forEach(control => {
          control.removeAttribute('aria-invalid')
          control.removeAttribute('aria-describedby')
        })
        window.setTimeout(() => {
          const remaining = form.querySelectorAll('.profileFieldMissing label')
          if (!remaining.length) { form.querySelector('#profile-required-fields')?.remove(); return }
          const names = Array.from(remaining, label => label.textContent.trim())
          const alert = form.querySelector('#profile-required-fields')
          if (alert) alert.textContent = bn ? `প্রয়োজনীয় তথ্য পূরণ করুন: ${names.join(', ')}` : `Please complete the required fields: ${names.join(', ')}`
        }, 0)
      }
      form.addEventListener('input', clearCompleted)
      form.addEventListener('change', clearCompleted)
      form.addEventListener('click', event => window.setTimeout(() => clearCompleted(event), 0))
    }
  }
  summary.textContent = bn ? `প্রয়োজনীয় তথ্য পূরণ করুন: ${matched.join(', ')}` : `Please complete the required fields: ${matched.join(', ')}`
  const first = form.querySelector('.profileFieldMissing input, .profileFieldMissing select, .profileFieldMissing textarea, .profileFieldMissing button, .profileFieldMissing [tabindex]')
  if (first) { first.focus(); first.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
  return true
}