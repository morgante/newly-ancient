import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const StaticPage = ({ title, location, children }) => {

  return (
    <Layout location={location}>
      <h2>{title}</h2>
      <div className="content static meta page">{children}</div>
    </Layout>
  )
}

export default StaticPage;
