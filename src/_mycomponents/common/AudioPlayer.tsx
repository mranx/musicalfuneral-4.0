import React, { useRef, useState } from 'react';

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src='/audio/audio.mp3'
        onEnded={() => setIsPlaying(false)}
      />
      <button onClick={togglePlayPause} className="focus:outline-none">
        {isPlaying ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="black" />
            <path d="M9 8H11V16H9V8ZM13 8H15V16H13V8Z" fill="white" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="black" />
            <path d="M9.5 8.96524C9.5 8.48795 9.5 8.24931 9.59974 8.11608C9.68666 7.99998 9.81971 7.92734 9.96438 7.91701C10.1304 7.90515 10.3311 8.0342 10.7326 8.2923L15.4532 11.327C15.8016 11.5509 15.9758 11.6629 16.0359 11.8053C16.0885 11.9297 16.0885 12.0701 16.0359 12.1945C15.9758 12.3369 15.8016 12.4489 15.4532 12.6728L10.7326 15.7075C10.3311 15.9656 10.1304 16.0947 9.96438 16.0828C9.81971 16.0725 9.68666 15.9998 9.59974 15.8837C9.5 15.7505 9.5 15.5119 9.5 15.0346V8.96524Z" fill="white" />
          </svg>
        )}
      </button>
    </>
  );
};

export default AudioPlayer;