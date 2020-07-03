import React from "react"
import { Link, graphql } from "gatsby"
import _ from "lodash";

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  const permalink = location.pathname;
  const tags = post.frontmatter.tags || [];
  const footnotes = post.frontmatter.footnotes || [];

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt || ""}
      />
      <div id="content" className="content primary single">
        <div className="pager entry single">
          {previous && (
            <Link
              className="previous"
              title={`Read ${previous.frontmatter.title}`}
              to={`/blog${previous.fields.slug}`} rel="previous">
              &laquo; <strong>Previous</strong>
            </Link>
          )}
          {next && (
            <Link
              className="next"
              title={`Read ${next.frontmatter.title}`}
              to={`/blog${next.fields.slug}`} rel="next">
              <strong>Next</strong> &raquo;
            </Link>
          )}
        </div>
        <div className="post">
          <div className="field title info">
            <div className="label">Title</div>
            <div className="value">
              <h3 className="title">
                <Link to={permalink} title="Permalink">{post.frontmatter.title}</Link>
              </h3>
            </div>
          </div>
          <div className="field date time info">
            <div className="label">Timestamp</div>
            <div className="value">
              Published on <span className="date">{post.frontmatter.date}</span>
            </div>
          </div>
          {tags.length >= 1 ? (<div className="field tags info">
            <div className="label">Tags</div>
            <div className="value">
              {_.join(tags, ", ")}
            </div>
          </div>) : null}
          <div className="field content">
            <div className="label">Content</div>
            <div className="value" dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
          {(footnotes.length >= 1) && (
          <div className="field footnotes" id="footnotes">
            <div className="label">Notes</div>
            <div className="value">
              <ol>
                {_.map(footnotes, (footnote, i) => {
                  const num = i + 1;
                  return (
                    <li key={num} id={`footnote-${num}`}>
                      {footnote} <a href={`#footnote-link-${num}`}>&#8617;</a>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        footnotes
      }
    }
  }
`
