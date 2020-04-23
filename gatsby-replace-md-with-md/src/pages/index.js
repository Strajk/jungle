import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const BlogIndex = ({ data }) => {
  const postsMd = data.allMarkdownRemark.edges
  const postsMdx = data.allMdx.edges

  return (
    <Layout>
      {postsMd.map(({ node }) => {
        return (
          <article key={node.fields.slug}>
            <h3>
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {node.frontmatter.title}
              </Link>
            </h3>
          </article>
        )
      })}

      {postsMdx.map(({ node }) => {
        return (
          <article key={node.fields.slug}>
            <h3>
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {node.frontmatter.title}
              </Link>
            </h3>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
