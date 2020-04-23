const visit = require("unist-util-visit")

exports.default = ({ markdownAST }) => {
  visit(markdownAST, ["heading"], (node) => {
    node.children = [
      ...node.children,
      { type: "text", value: " ⭐"}
    ]
  })
  return markdownAST
}

