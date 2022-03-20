import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body className="bg-slate-50 h-screen bg-center bg-fixed bg-no-repeat bg-cover bg-[url('/static/images/bg.jpg')]">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
