exports.mutateSource = ({ markdownNode }) => {
  markdownNode.internal.content = markdownNode.internal.content.replace(
    /dog/ig,
    "<abbr title='The Dog'>🐶</abbr>"
  )
}
