import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Favicon } from '../components/public/Favicon'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;600;900&display=block" rel="stylesheet" /> 
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