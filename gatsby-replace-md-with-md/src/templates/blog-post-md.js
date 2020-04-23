import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>
      <section dangerouslySetInnerHTML={{ __html: post.html }}/>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`
