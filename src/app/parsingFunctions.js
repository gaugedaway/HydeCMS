export function parsePostFilename(filename) {
  const checkFilename = /^(\d{4})-(\d{2})-(\d{2})-([^\.]+)\.(html|textile|md)/
  if(!checkFilename.test(filename)) return null
  let partedFilename = filename.match(checkFilename)
  return {
    filename: filename,
    title: partedFilename[4],
    date: new Date(parseInt(partedFilename[1], 10), parseInt(partedFilename[2], 10), parseInt(partedFilename[3], 10)),
    format: partedFilename[5]
  }
}