import React from "react"
import { Link } from "gatsby"

import "../css/layout.css"

import Header from "./header"

const Layout = ({ location, title, children }) => {
  return (
    <div>
      <div id="grid_overlay">
        <div className="grid">&nbsp;</div>
      </div>
      <div id="borders">&nbsp;</div>
      <div id="page">
        <Header
          location={location}
          title={title}
          children={children} />
      </div>
    </div>
  )
}

export default Layout
