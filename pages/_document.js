import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Favicon } from '../components/public/Favicon'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
            <link rel="stylesheet" href="/fonts/fonts.css" />
            <Favicon />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument