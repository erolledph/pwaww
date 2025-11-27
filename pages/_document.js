import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA Meta Tags */}
          <meta name="application-name" content="techipedia" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="techipedia" />
          <meta
            name="description"
            content="best place to learn trendy tech and understanding concepts."
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#1f2023" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#1f2023" />

          {/* Icons */}
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-72x72.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/icons/maskable.png" color="#1f2023" />
          <link rel="shortcut icon" href="/icons/icon-192x192.png" />

          {/* Preconnect to external resources */}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
            integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
            crossOrigin="anonymous"
          />

          {/* RSS Feed */}
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        </Head>
        <body className="antialiased text-black bg-white dark:bg-background-color dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
