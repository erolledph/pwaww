import { useEffect, useRef, useState } from 'react'

export default function InstallApp() {
  const deferredPrompt = useRef(null)
  const [showButton, setShowButton] = useState(true)
  const [hasNativePrompt, setHasNativePrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      deferredPrompt.current = e
      setHasNativePrompt(true)
      console.log('✅ Native install prompt available')
    }

    const handleAppInstalled = () => {
      setShowButton(false)
      deferredPrompt.current = null
      console.log('✅ App successfully installed')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) {
      setShowButton(false)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt.current) {
      try {
        deferredPrompt.current.prompt()
        const { outcome } = await deferredPrompt.current.userChoice
        if (outcome === 'accepted') {
          deferredPrompt.current = null
          setShowButton(false)
        }
      } catch (err) {
        console.error('Install error:', err)
      }
    } else {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      const msg = isIOS
        ? '📱 iOS: Tap Share → Add to Home Screen'
        : '📱 Android: Tap Menu → Install App'
      alert(msg)
    }
  }

  if (!showButton) return null

  return (
    <button
      className="relative inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-lg px-3 py-1.5 ml-1 sm:ml-2 text-xs sm:text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
      onClick={handleInstallClick}
      aria-label="Install app"
      title="Install this app to your device"
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
      <span className="hidden sm:inline">Install</span>
    </button>
  )
}
