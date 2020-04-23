const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostMd = path.resolve(`./src/templates/blog-post-md.js`)
  const blogPostMdx = path.resolve(`./src/templates/blog-post-mdx.js`)

  const resultMd = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (resultMd.errors) {
    throw resultMd.errors
  }

  const resultMdx = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
              body
            }
          }
        }
      }
    `
  )

  if (resultMdx.errors) {
    throw resultMdx.errors
  }

  // Create blog posts pages.
  const postsMd = resultMd.data.allMarkdownRemark.edges
  const postsMdx = resultMdx.data.allMdx.edges

  postsMd.forEach((post, index) => {
    const previous = index === postsMd.length - 1 ? null : postsMd[index + 1].node
    const next = index === 0 ? null : postsMd[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPostMd,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  postsMdx.forEach((post, index) => {
    const previous = index === postsMdx.length - 1 ? null : postsMdx[index + 1].node
    const next = index === 0 ? null : postsMdx[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPostMdx,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
