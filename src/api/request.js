import parser from 'fast-xml-parser'
let channel = null

async function fetchRSS () {
  const result = await fetch('/db.xml')
  const xml = await result.text()
  const json = parser.parse(xml)
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

  const episode = episodes.find(episode => episode.guid === id)
  if (!episode) return
  console.log(episode)
  return {
    ...episode,
    channelName: channel.title,
    imageUrl: channel.image.url
  }
}
