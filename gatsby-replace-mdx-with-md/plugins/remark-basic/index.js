const visit = require("unist-util-visit")

const main = ({ markdownAST }, replacements = {}) => {
  visit(markdownAST, ["text"], (node, index, parent) => {
    node.value = node.value + " !!!";
  })
  return markdownAST
}

module.exports = main
