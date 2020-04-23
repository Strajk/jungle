## Gatsby example of transforming MD & MDX in remark plugins

Posts: 

- ./content/blog/hello-world-md/index.md
- ./content/blog/hello-world-mdx/index.mdx

Plugins:

- ./plugins/remark-ast – add ⭐ at the end of headings
- ./plugins/remark-mutate-source – replaces "dog" with dog emoji in abbr html tag

