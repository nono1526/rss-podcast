import parser from 'fast-xml-parser'
export function fetchChannel () {
  return fetch('/db.xml')
    .then(res => {
      return res.text()
    })
    .then(xml => {
      const {
        rss: {
          channel: {
            title,
            image,
            item,
            description
          }
        }
      } = parser.parse(xml)

      return {
        title,
        image,
        item,
        description
      }
    })
}
