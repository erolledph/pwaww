import { useEffect, useRef, useState } from 'react'

export default function InstallApp() {
  const deferredPrompt = useRef(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      deferredPrompt.current = e
      setShowButton(true)
    }

    const handleAppInstalled = () => {
      setShowButton(false)
      deferredPrompt.current = null
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

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
      }
    }
  }

  if (!showButton) return null

  return (
    <button
      className="bg-blue-700 hover:bg-blue-500 text-white font-extralight rounded-md px-2 py-1 ml-2"
      onClick={handleInstallClick}
    >
      Install App
    </button>
  )
}
