import parser from 'fast-xml-parser'
let channel = null

async function fetchRSS () {
  const options = {
    ignoreAttributes: false
  }
  const result = await fetch('https://api.soundon.fm/v2/podcasts/954689a5-3096-43a4-a80b-7810b219cef3/feed.xml')
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

  if (!episode) return false

  const episodeId = episode.guid['#text']
  const nextEpisode = findNextEpisodeIdById(episodeId)
  const prevEpisode = findPreviousEpisodeIdById(episodeId)
  return {
    ...episode,
    id: episodeId,
    channelName: channel.title,
    imageUrl: channel.image.url,
    audio: {
      length: episode.enclosure['@_length'],
      type: episode.enclosure['@_type'],
      url: episode.enclosure['@_url']
    },
    nextEpisode,
    prevEpisode
  }
}

export function findPreviousEpisodeIdById (id) {
  const {
    item: episodes
  } = channel
  const episodeIndex = episodes.findIndex(episode => episode.guid['#text'] === id)
  const prevIndex = episodeIndex + 1
  const prevEpisode = prevIndex > episodes.length - 1 ? null : episodes[prevIndex].guid['#text']
  return prevEpisode
}

export function findNextEpisodeIdById (id) {
  const {
    item: episodes
  } = channel
  const episodeIndex = episodes.findIndex(episode => episode.guid['#text'] === id)
  const nextIndex = episodeIndex - 1
  const nextEpisode = nextIndex < 0 ? null : episodes[nextIndex].guid['#text']
  return nextEpisode
}
