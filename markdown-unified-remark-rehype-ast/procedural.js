const assert = require("assert")
const fs = require("fs")

const unified = require("unified")
const remarkParse = require("remark-parse")
const remark2rehype = require("remark-rehype")
const rehypeRaw = require("rehype-raw")
const rehypeStringify = require("rehype-stringify")
const visit = require("unist-util-visit")

const md = fs.readFileSync("./example.md", "utf-8")

const mdAst = unified().use(remarkParse).parse(md) // Parse

// Process AST (add ! at the end of headings, replace special character sequence with tag)
// ===

// Option A: Basic mutation
visit(mdAst, ["heading"], (node, index, parent) => {
  node.children[0].value = node.children[0].value + "!"
})
const REGEXP = /XXX/g
visit(mdAst, ["text"], (node, index, parent) => {
  if (REGEXP.test(node.value)) {
    const replaced = node.value.replace(REGEXP, "<big>The Big X</big>")
    const ast = unified().use(remarkParse).parse(replaced)
    const astInterestingPart = ast.children[0].children

    parent.children = [
      ...parent.children.slice(0, index - 1),
      ...astInterestingPart,
      ...parent.children.slice(index + 1),
    ]
  }
})

// Option B: Unified plugin
/*
const myTransformation = options => tree => {
  visit(tree, "heading", headingNode => {
    visit(headingNode, "text", textNode => {
      textNode.value += "!";
    });
  });
};
const mdAstTransformedAlt = unified().use(myTransformation).runSync(mdAst)

assert(mdAst === mdAstTransformedAlt)
*/


// Convert to HTML
// ===

// Option A
const htmlAst = unified().use(remark2rehype, { allowDangerousHtml: true }).use(rehypeRaw).runSync(mdAst); // RunSync
const html = unified().use(rehypeStringify).stringify(htmlAst); // Stringify
console.log("Option A", "\n", html)

console.log("\n\n")

// Option B
const processor = unified().use(remark2rehype, { allowDangerousHtml: true }).use(rehypeRaw).use(rehypeStringify)
const html2 = processor.stringify(processor.runSync(mdAst))
console.log("Option B", "\n", html2)
