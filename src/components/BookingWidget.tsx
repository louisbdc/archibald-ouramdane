import { useEffect, useMemo, useRef, useState } from 'react'

const FR_DAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'] as const
const TIMES = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:30', '20:00'] as const
const TAKEN_SLOTS = new Set([2, 5]) // créneaux simulés comme indisponibles

type Place = 'cabinet' | 'domicile'

interface DayOption {
  index: number
  label: string
  num: number
  date: Date
}

function buildDays(): DayOption[] {
  const today = new Date()
  return Array.from({ length: 4 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const label = i === 0 ? 'Auj.' : i === 1 ? 'Dem.' : FR_DAYS[d.getDay()]
    return { index: i, label, num: d.getDate(), date: d }
  })
}

export default function BookingWidget() {
  // Les jours dépendent de la date courante — calculés côté client uniquement.
  const [days, setDays] = useState<DayOption[]>([])
  const [place, setPlace] = useState<Place>('cabinet')
  const [dayIndex, setDayIndex] = useState(0)
  const [time, setTime] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [toast, setToast] = useState<{ title: string; subtitle: string } | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setDays(buildDays())
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current)
    }
  }, [])

  const showToast = (title: string, subtitle: string) => {
    setToast({ title, subtitle })
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 6000)
  }

  const confirmLabel = useMemo(() => {
    if (sent) return 'Demande envoyée ✓'
    return time ? `Confirmer · ${time} →` : 'Choisir un créneau'
  }, [sent, time])

  const handleConfirm = () => {
    if (!time || sent) return
    const selected = days[dayIndex]
    const dayStr = selected
      ? selected.date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
      : ''
    const where =
      place === 'cabinet' ? 'au cabinet (107 Cours Lieutaud)' : 'à domicile'
    showToast(
      'Demande envoyée ✓',
      `Séance ${where} · ${dayStr} à ${time}. Archibald vous recontacte pour confirmer.`
    )
    setSent(true)
  }

  return (
    <>
      <div className="booking-card reveal" id="book">
        <h3>Réservez en 1 minute</h3>
        <p className="bc-sub">Choisissez un créneau, confirmation immédiate.</p>
        <div className="bc-seg" id="bcSeg">
          <button
            className={place === 'cabinet' ? 'active' : undefined}
            type="button"
            onClick={() => setPlace('cabinet')}
          >
            Au cabinet · 80 €
          </button>
          <button
            className={place === 'domicile' ? 'active' : undefined}
            type="button"
            onClick={() => setPlace('domicile')}
          >
            À domicile · 95 €
          </button>
        </div>
        <div className="bc-label">Jour</div>
        <div className="bc-days" id="bcDays">
          {days.map((d) => (
            <button
              key={d.index}
              type="button"
              className={`bc-day${d.index === dayIndex ? ' active' : ''}`}
              onClick={() => setDayIndex(d.index)}
            >
              <div className="d-name">{d.label}</div>
              <div className="d-num">{d.num}</div>
            </button>
          ))}
        </div>
        <div className="bc-label">Créneaux disponibles</div>
        <div className="bc-times" id="bcTimes">
          {TIMES.map((t, idx) => {
            const disabled = TAKEN_SLOTS.has(idx)
            return (
              <button
                key={t}
                type="button"
                className={`bc-time${time === t ? ' active' : ''}`}
                disabled={disabled}
                style={
                  disabled
                    ? { opacity: 0.34, cursor: 'not-allowed', textDecoration: 'line-through' }
                    : undefined
                }
                onClick={() => !disabled && setTime(t)}
              >
                {t}
              </button>
            )
          })}
        </div>
        <button
          className="btn btn-primary btn-block"
          id="bcConfirm"
          type="button"
          disabled={!time || sent}
          style={{ opacity: time && !sent ? 1 : 0.6 }}
          onClick={handleConfirm}
        >
          {confirmLabel}
        </button>
        <div className="bc-foot">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Sans engagement · annulation gratuite
        </div>
      </div>

      <div
        className={`toast${toast ? ' show' : ''}`}
        id="toast"
        role="status"
        aria-live="polite"
      >
        <span className="to-ico">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </span>
        <div>
          <div className="to-t">{toast?.title ?? 'Demande envoyée ✓'}</div>
          <div className="to-s">{toast?.subtitle ?? ''}</div>
        </div>
      </div>
    </>
  )
}
