import { useEffect, useRef, useState } from 'react'

export default function InstallApp() {
  const deferredPrompt = useRef(null)
  const [showButton, setShowButton] = useState(false)
  const [isPWASupported, setIsPWASupported] = useState(false)

  useEffect(() => {
    // Check if running on a PWA-capable browser
    const hasPWASupport = 'serviceWorker' in navigator && 'PushManager' in window

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      deferredPrompt.current = e
      setShowButton(true)
      setIsPWASupported(true)
      console.log('beforeinstallprompt event fired - Install prompt available')
    }

    const handleAppInstalled = () => {
      setShowButton(false)
      deferredPrompt.current = null
      console.log('PWA successfully installed')
    }

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Check if PWA is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowButton(false)
      console.log('App is already running as a PWA')
    }

    // Log PWA support info
    console.log('PWA Support Check:', {
      serviceWorker: 'serviceWorker' in navigator,
      PushManager: 'PushManager' in window,
      standalone: window.navigator.standalone,
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt()
      const { outcome } = await deferredPrompt.current.userChoice
      console.log(`User response to install prompt: ${outcome}`)
      if (outcome === 'accepted') {
        deferredPrompt.current = null
        setShowButton(false)
      }
    } else {
      // Fallback for iOS or browsers without beforeinstallprompt
      alert(
        'To install this app:\n\n1. Tap the Share button (iOS) or Menu button (Android)\n2. Select "Add to Home Screen"\n3. Tap "Add"'
      )
    }
  }

  if (!showButton) return null

  return (
    <button
      className="relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg px-3 py-1.5 ml-1 sm:ml-2 text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-1"
      onClick={handleInstallClick}
      aria-label="Install app"
      title="Click to install this app"
    >
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2h2V6a4 4 0 00-4-4H4a4 4 0 00-4 4v10a4 4 0 004 4h12a4 4 0 004-4v-2h-2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
        <path d="M12 2v8m0 0l-3-3m3 3l3-3"></path>
      </svg>
      <span>Install</span>
    </button>
  )
}
