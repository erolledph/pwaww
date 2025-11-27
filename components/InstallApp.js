import { useEffect, useRef, useState } from 'react'

export default function InstallApp() {
  const deferredPrompt = useRef(null)
  const [showButton, setShowButton] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      deferredPrompt.current = e
      setShowButton(true)
      setIsSupported(true)
      console.log('Install prompt is available')
    }

    const handleAppInstalled = () => {
      setShowButton(false)
      deferredPrompt.current = null
      console.log('App installed')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Check if PWA is already installed
    if (window.navigator.standalone === true) {
      setShowButton(false)
      console.log('App is already installed')
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt()
      const { outcome } = await deferredPrompt.current.userChoice
      if (outcome === 'accepted') {
        deferredPrompt.current = null
        setShowButton(false)
        console.log('Install accepted')
      }
    }
  }

  if (!showButton) return null

  return (
    <button
      className="bg-blue-700 hover:bg-blue-500 text-white font-semibold rounded-md px-3 py-1 ml-1 sm:ml-2 text-sm sm:text-base"
      onClick={handleInstallClick}
      aria-label="Install App"
    >
      Install App
    </button>
  )
}
