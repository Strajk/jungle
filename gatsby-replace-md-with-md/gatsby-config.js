module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx"],
        gatsbyRemarkPlugins: [
          require.resolve("./plugins/remark-mutate-source"),
          require.resolve("./plugins/remark-ast")
        ]
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          require.resolve("./plugins/remark-mutate-source"),
          require.resolve("./plugins/remark-ast")
        ]
      }
    }
  ]
}
