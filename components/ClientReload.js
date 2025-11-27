import { useEffect } from 'react'
import Router from 'next/router'

/**
 * Client-side complement to next-remote-watch
 * Re-triggers getStaticProps when watched mdx files change
 *
 */
export const ClientReload = () => {
  // Exclude socket.io from prod bundle
  useEffect(() => {
    import('socket.io-client').then((module) => {
      const socket = module.io(undefined, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        transports: ['websocket'],
        path: '/socket.io/',
      })
      socket.on('reload', (data) => {
        Router.replace(Router.asPath, undefined, {
          scroll: false,
        })
      })
      socket.on('connect_error', (error) => {
        console.debug('Socket connection error (this is normal if using npm run dev):', error.message)
      })
      return () => {
        socket.disconnect()
      }
    })
  }, [])

  return null
}
