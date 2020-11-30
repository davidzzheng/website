import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class DzDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap"
            rel="stylesheet"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
            integrity="sha512-yNJzAsg5JyP91u+sLHlUDULMBd3hmEiVkYeeN1cQBKaLZ7EyT6oH2u5THNIRM2Fu6VKcZJv+F/QAp1h/qzy9Ow=="
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
