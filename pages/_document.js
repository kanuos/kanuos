import Document, { Html, Head, Main, NextScript } from "next/document";
import { Favicon } from "../components/public/Favicon";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400&family=Montserrat:wght@500;700&display=swap"
            rel="stylesheet"
          />
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
