import { useEffect, useRef, useState } from 'react'

export default function InstallApp() {
  const deferredPrompt = useRef(null)
  const [showButton, setShowButton] = useState(true)
  const [canInstall, setCanInstall] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      setShowButton(false)
      return
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      deferredPrompt.current = e
      setCanInstall(true)
      console.log('✅ beforeinstallprompt fired - app can be installed')
    }

    // Listen for successful installation
    const handleAppInstalled = () => {
      setShowButton(false)
      setIsInstalled(true)
      deferredPrompt.current = null
      console.log('✅ App installed successfully')
    }

    // Listen for app being launched
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Log app state
    console.log('📱 PWA Status:', {
      serviceWorkerReady: 'serviceWorker' in navigator,
      standalone: window.matchMedia('(display-mode: standalone)').matches,
      userAgent: navigator.userAgent.substring(0, 60),
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (isInstalled) {
      setShowButton(false)
      return
    }

    // If we have the native prompt
    if (deferredPrompt.current && canInstall) {
      try {
        deferredPrompt.current.prompt()
        const { outcome } = await deferredPrompt.current.userChoice
        console.log(`User install decision: ${outcome}`)

        if (outcome === 'accepted') {
          setShowButton(false)
          setIsInstalled(true)
        }
        deferredPrompt.current = null
      } catch (error) {
        console.error('Install prompt error:', error)
      }
    } else {
      // Fallback: show manual install instructions
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      const isAndroid = /Android/.test(navigator.userAgent)

      let message = ''
      if (isIOS) {
        message =
          '📱 iOS Installation:\n\n' +
          '1. Tap the Share button\n' +
          '2. Tap "Add to Home Screen"\n' +
          '3. Tap "Add"'
      } else if (isAndroid) {
        message =
          '📱 Android Installation:\n\n' +
          '1. Tap Menu (⋯)\n' +
          '2. Tap "Install app"\n' +
          '3. Confirm'
      } else {
        message =
          '💻 Desktop Installation:\n\n' +
          'Look for an install icon in your browser address bar, ' +
          'or click the menu and select "Install"'
      }

      alert(message)
    }
  }

  if (!showButton || isInstalled) return null

  return (
    <button
      className="relative inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-lg px-3 py-1.5 ml-1 sm:ml-2 text-xs sm:text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
      onClick={handleInstallClick}
      aria-label="Install app"
      title={canInstall ? 'Click to install' : 'Install to home screen'}
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
      <span className="hidden sm:inline">Install</span>
    </button>
  )
}
