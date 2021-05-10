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
            description,
            'itunes:author': author
          }
        }
      } = parser.parse(xml)
      const json = parser.parse(xml)
      console.log(json)
      return {
        title,
        image,
        item,
        description,
        author
      }
    })
}
