import Document, { Html, Head, Main, NextScript } from "next/document";
import { Favicon } from "../components/public/Favicon";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Poppins:wght@500;700;900&display=swap"
            rel="stylesheet"
          ></link> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@500;700;900&display=swap"
            rel="stylesheet"
          ></link>
          <Favicon />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
