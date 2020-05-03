import React from "react"
import { Link, graphql } from "gatsby"

import StaticPage from "../templates/static-page";

const AboutPage = ({ location }) => {

  return (
    <StaticPage
      title="About Morgante"
      location={location}>
        <p className="intro">I'm a entrepreneurial engineer from the <a href="https://www.flickr.com/photos/7355435@N04/503504203/in/photostream/">green mountains</a> of <a href="https://en.wikipedia.org/wiki/Vermont">Vermont</a>.
        Currently, I help enterprises adopt DevOps at <a href="https://www.cloud.google.com">Google Cloud</a>.
        You might know me from <a href="http://www.somespider.com">Some Spider</a>, <a href="https://businessinsider.com">Business Insider</a>, <a href="http://nyuad.nyu.edu">NYU Abu Dhabi</a>, <a href="http://www.getgandalf.com/">Gandalf</a>, or <a href="http://hackny.org/">hackNY</a>.</p>
        <p>This is my personal blog, including archives of my publications and thoughts. 
        Topics discussed within these pages include design, technology, politics, and education.</p>
        <p className="note">Note that much of the content is over a decade old and does not necessarily represent my current thoughts.</p>
        <h3>History</h3>
        <p>Newly Ancient was first started in June of 2006, when I was still in middle school.
          Since then, it has gone through many iterations and adaptations. The content has been aggregated here, but is not necessarily presented in its original form.
          The archives include a mix of longer entries and shorter links meant to highlight content elsewhere.
          Content focuses around technology, education, and where the two intersect.</p>
    </StaticPage>
  )
}

export default AboutPage;
