import { NextPage } from 'next'
import Link from 'next/link'

import { Layout } from '@components'

const NotFoundPage: NextPage = () => {
  return (
    <Layout>
      <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-3xl font-light mb-4">Page Not Found</p>
        <Link href="/">
          <a className="p-2 rounded-md bg-sky-500 hover:bg-sky-600 text-white">
            Go Home
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage
