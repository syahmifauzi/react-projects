import { FC } from 'react'

import SEO from './SEO'

const Layout: FC = ({ children }) => {
  return (
    <>
      <SEO />
      <div className="max-w-7xl mx-auto p-3 mb-8">{children}</div>
    </>
  )
}

export default Layout
