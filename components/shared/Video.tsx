
"use client"
import React, { useEffect, useRef } from "react";

interface VideoProps {
  src: string; // Path to the video file
  preload?: 'auto' | 'metadata' | 'none'; // Preload behavior
  autoplay?: boolean; // Autoplay the video
  loop?: boolean; // Loop the video
  muted?: boolean; // Mute the video
  controls?: boolean; // Show video controls
  className?: string; // Custom styling
}

const Video: React.FC<VideoProps> = ({
  src,
  preload = 'auto',
  autoplay = true,
  loop = true,
  muted = true,
  controls = false,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video && autoplay) {
      video
        .play()
        .catch((err) => console.warn('Autoplay prevented:', err));
    }
  }, [autoplay]);

  return (
    <video
      ref={videoRef}
      className={`w-full h-full object-cover ${className}`}
      src={src}
      preload={preload}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
      controls={controls}
      playsInline // Mobile-friendly autoplay
    />
  );
};

export default Video;
