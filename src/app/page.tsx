'use client';

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Dialog } from '@headlessui/react'
import { MediaPlayer, MediaPlayerInstance, MediaProvider } from '@vidstack/react'
import '@vidstack/react/player/styles/base.css'
import clsx from 'clsx'
import { PlayIcon, PauseIcon, MuteIcon, VolumeHighIcon } from '@vidstack/react/icons'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  {
    name: '软件',
    href: '#',
    target: '_blank',
  },
  {
    name: '关于',
    href: '//blog.villager.cafe',
    target: '_blank',
  },
]

// const getAudioSource = async () => await fetch('/with-an-orchid.m4a');

function Index() {
  const playerRef = useRef<MediaPlayerInstance | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [playing, setPlayingStatus] = useState<boolean>(true);
  const [mute, setMuteStatus] = useState<boolean>(true);
  const [isCanPlay, setCanPlayStatus] = useState(false);

  useEffect(() => {
    const onDocumentMouseMove = () => setPlayingStatus(false)

    document.addEventListener('mousemove', onDocumentMouseMove, false)

    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove, false)
    }
  }, [])

  // const readyStatusRef = useRef<boolean>(false);

  // const audioContextRef = useRef<AudioContext>(new AudioContext());
  // const gainNodeRef = useRef(new GainNode(audioContextRef.current));
  // const sourceBufferRef = useRef<AudioBufferSourceNode | null>(null);

  // useEffect(() => {
  //   if (readyStatusRef.current !== true) {
  //     readyStatusRef.current = true;

  //     getAudioSource()
  //       .then(response => response.arrayBuffer())
  //       .then(buffer => audioContextRef.current.decodeAudioData(buffer))
  //       .then(audio => {
  //         sourceBufferRef.current = audioContextRef.current.createBufferSource();
  //         sourceBufferRef.current.buffer = audio;
  //         sourceBufferRef.current.connect(gainNodeRef.current);

  //         gainNodeRef.current.connect(audioContextRef.current.destination);
  //       });
  //   }

  //   return () => {
  //     gainNodeRef.current?.disconnect();
  //     sourceBufferRef.current?.disconnect();
  //   }
  // }, []);

  const onPlayIconClick = () => {
    playerRef.current?.play();
  };

  const onPauseIconClick = () => {
    playerRef.current?.pause();
  };

  const onEnded = () => setMuteStatus(true);

  const onPlay = () => setPlayingStatus(true);

  const onPause = () => setPlayingStatus(false);

  const onVolumeIconClick = () => setMuteStatus(true);

  const onMuteIconClick = () => setMuteStatus(false);

  const onCanPlay = () => setCanPlayStatus(true);

  return (
    <div className="h-full flex flex-1 select-none bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Villager</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex gap-x-4 mr-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.target}
                className={clsx('text-sm font-semibold leading-6', isCanPlay ? 'text-white' : 'text-indigo-600')}
              >
                {item.name}
              </a>
            ))}
          </div>

          {
            playing ? <PauseIcon className={clsx('w-5', isCanPlay ? 'text-white' : 'text-indigo-600')} onClick={onPauseIconClick} /> : <PlayIcon className={clsx('w-5', isCanPlay ? 'text-white' : 'text-indigo-600')} onClick={onPlayIconClick} />
          }
          {
            mute ? <MuteIcon className={clsx('w-5', isCanPlay ? 'text-white' : 'text-indigo-600')} onClick={onMuteIconClick} /> : <VolumeHighIcon className={clsx('w-5', isCanPlay ? 'text-white' : 'text-indigo-600')} onClick={onVolumeIconClick} />
          }
          {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div> */}
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Villager</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                {/* <span className="sr-only">&times;</span> */}
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 items-center lg:px-8 flex flex-1">
        {/* <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 border-2 border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:text-indigo-500 hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
            </div>
          </div>
        </div> */}

        <div className="absolute inset-x-0 -z-10 top-0 left-0 bottom-0 right-0 overflow-hidden">
          <MediaPlayer
            autoplay
            muted={mute}
            crossorigin
            title="With an orchid"
            controls={false}
            src="/with-an-orchid.mp4"
            ref={playerRef}
            onCanPlay={onCanPlay}
            className='w-full h-full'
            onPlay={onPlay}
            onPause={onPause}
            onEnded={onEnded}
          >
            <MediaProvider />
          </MediaPlayer>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Index), { ssr: false });
