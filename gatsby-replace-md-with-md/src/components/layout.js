import React from "react"
import { Link } from "gatsby"

const Layout = ({ children }) => {
  const header = (
    <h1>
      <Link style={{ boxShadow: `none`, color: `inherit` }} to={`/`}>Blog example</Link>
    </h1>
  )

  return (
    <div style={{ marginLeft: `auto`, marginRight: `auto` }}>
      <header>{header}</header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
