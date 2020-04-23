import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/Layout"

function BlogPostTemplateMdx({ data }) {
  const post = data.mdx

  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>
      <MDXRenderer>{post.body}</MDXRenderer>
    </Layout>
  )
}

export default BlogPostTemplateMdx

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
