import { onMounted, reactive, toRefs, computed, inject, watch } from 'vue'

export function usePPlayer () {
  const audioControl = inject('audio')

  const play = url => {
    audioControl.url = url
  }

  const setPlayer = ({
    cover = '',
    title = '',
    subTitle = '',
    nowPlayingId = '',
    nextEpisode = '',
    prevEpisode = ''
  }) => {
    audioControl.cover = cover
    audioControl.title = title
    audioControl.subTitle = subTitle
    audioControl.nowPlayingId = nowPlayingId
    audioControl.nextEpisode = nextEpisode
    audioControl.prevEpisode = prevEpisode
  }
  const canPlay = id => {
    const isSameEpisode = isNowPlayingId(id)
    return audioControl.isPlaying && isSameEpisode
  }
  const isNowPlayingId = id => audioControl.nowPlayingId === id
  return {
    play,
    setPlayer,
    isNowPlayingId,
    canPlay,
    audioControl
  }
}
