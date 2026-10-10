import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from '@/app/App'
import { AppProviders } from '@/app/providers/AppProviders'
import i18n from '@/i18n'

function renderApp() {
  return render(
    <AppProviders>
      <App />
    </AppProviders>,
  )
}

describe('portfolio page', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders every section and the verified contact links', async () => {
    renderApp()
    expect(screen.getByRole('heading', { level: 1, name: /Mohammed\s+Abughazala/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Selected Work' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Beyond the Code' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Tools & Technologies' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Experience' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Experience' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Education and Highlights' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "Let's Build Something Meaningful." })).toBeInTheDocument()
    expect(document.querySelector('[data-screen="portrait"]')).toHaveTextContent('MA')
    expect(screen.getByText(/not presented as finished features/i)).toBeInTheDocument()
    expect(screen.getByText(/not clinically validated/i)).toBeInTheDocument()
    expect(screen.getByText(/does not claim a placement or award/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /mo\.abughazala@gmail\.com/i })).toHaveAttribute(
      'href',
      'mailto:mo.abughazala@gmail.com',
    )
    const github = screen.getByRole('link', { name: /github\.com\/7amood123/i })
    expect(github).toHaveAttribute('href', 'https://github.com/7amood123')
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(github).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    expect(screen.getByRole('link', { name: /mohammed-abughazala-810007257/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/mohammed-abughazala-810007257/',
    )
    expect(document.querySelector('canvas')).toBeNull()
    await waitFor(() => expect(document.title).toBe('Mohammed Abughazala | Software Engineer'))
  })

  it('switches to Turkish without a reload and remembers the choice', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole('button', { name: 'Türkçe' }))
    expect(await screen.findByRole('heading', { name: 'Öne Çıkan Projeler' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Birlikte Değerli Bir Şeyler Üretelim.' })).toBeInTheDocument()
    await waitFor(() => expect(document.documentElement.lang).toBe('tr'))
    expect(localStorage.getItem('ma-lang')).toBe('tr')
    await waitFor(() => expect(document.title).toBe('Mohammed Abughazala | Yazılım Mühendisi'))
  })

  it('copies the email address and announces the result', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      writable: true,
      value: { writeText },
    })
    renderApp()
    await user.click(screen.getByRole('button', { name: 'Copy email address' }))
    expect(writeText).toHaveBeenCalledWith('mo.abughazala@gmail.com')
    expect(await screen.findByRole('status')).toHaveTextContent('Email copied')
  })
})
