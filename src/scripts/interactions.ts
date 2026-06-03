/* ============================================================
   Archibald Ouramdane — interactions globales (hors widget React)
   ============================================================ */

/* ---- Header sticky + barre de réservation flottante ---- */
function initStickyHeader() {
  const header = document.querySelector<HTMLElement>('.site-header')
  const sticky = document.getElementById('stickyBar')

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset
    if (header) header.classList.toggle('scrolled', y > 30)
    if (sticky) sticky.classList.toggle('show', y > 640)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

/* ---- Révélation au défilement ---- */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
}

/* ---- Défilement vers la section de réservation ---- */
function initScrollToBook() {
  document.querySelectorAll<HTMLElement>('[data-scroll-book]').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault()
      const target = document.getElementById('reserver')
      if (!target) return
      const top = target.getBoundingClientRect().top + window.scrollY - 90
      window.scrollTo({ top, behavior: 'smooth' })
    })
  })
}

initStickyHeader()
initReveal()
initScrollToBook()
