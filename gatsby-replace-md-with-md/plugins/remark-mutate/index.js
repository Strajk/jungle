exports.mutateSource = ({ markdownNode }) => {
  markdownNode.internal.content = markdownNode.internal.content.replace(
    /🇨🇿 ([\w ]+)/,
    "<abbr title='Czech translation'>🇨🇿 $1</abbr>"
  )
}
