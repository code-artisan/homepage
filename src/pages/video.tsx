import { MediaPlayer, MediaProvider } from '@vidstack/react'
import '@vidstack/react/player/styles/base.css'

// eslint-disable-next-line react/display-name
const Video = () => {
  return (
    <MediaPlayer
      loop
      autoplay
      muted={false}
      title="With an orchid"
      controls={false}
      src="/with-an-orchid.mp4"
      // ref={playerRef}
      // onCanPlay={onCanPlay}
      className='w-full h-full'
      // onPlay={onPlay}
      // onPause={onPause}
      // onEnded={onEnded}
    >
      <MediaProvider />
    </MediaPlayer>
  );
}

export default Video;
