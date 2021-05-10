import parser from 'fast-xml-parser'
import he from 'he'
let channel = null

async function fetchRSS () {
  const options = {
    ignoreAttributes: false
  }
  const result = await fetch('/db.xml')
  const xml = await result.text()
  const json = parser.parse(xml, options)
  return json.rss
}

export async function fetchChannel () {
  if (!channel) {
    const rss = await fetchRSS()
    channel = rss.channel
  }

  const {
    title,
    image,
    item,
    description,
    'itunes:author': author
  } = channel

  return {
    title,
    image,
    item,
    description,
    author
  }
}

export async function fetchEpisodeById (id) {
  if (!channel) {
    const rss = await fetchRSS()
    channel = rss.channel
  }
  const {
    item: episodes
  } = channel
  const episode = episodes.find(episode => episode.guid['#text'] === id)
  if (!episode) return
  console.log(episode)
  return {
    ...episode,
    id: episode.guid['#text'],
    channelName: channel.title,
    imageUrl: channel.image.url,
    audio: {
      length: episode.enclosure['@_length'],
      type: episode.enclosure['@_type'],
      url: episode.enclosure['@_url']
    }
  }
}
