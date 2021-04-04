import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="author" content="Syahmi Fauzi" />
          <meta name="description" content="Simple To-Do App" />
          <meta
            name="keywords"
            content="React JS, Next JS, Airtable, Auth0, Tailwind CSS, Netlify"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="bg-gray-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
