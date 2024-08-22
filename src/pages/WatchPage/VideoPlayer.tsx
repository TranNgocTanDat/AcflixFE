import Hls, { Level } from "hls.js";
import React, { useRef, useEffect, useState } from "react";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hls, setHls] = useState<Hls | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [showQualityBtn, setShowQualityBtn] = useState(false);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hlsInstance = new Hls();
      setHls(hlsInstance);

      hlsInstance.loadSource(src);
      if (videoRef.current) {
        hlsInstance.attachMedia(videoRef.current);
      }

      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        setLevels(hlsInstance.levels);
      });

      return () => {
        hlsInstance.destroy();
      };
    }
  }, [src]);

  const changeQuality = (index: number) => {
    if (hls && levels.length > index) {
      hls.currentLevel = index;
      setShowQualityBtn(false); // Hide the quality button after selection
    }
  };

  return (
    <div className="video-player">
      <video ref={videoRef} controls style={{ width: "100%" }}></video>
      <div className={`hd ${showQualityBtn ? 'active' : ''}`} onClick={() => setShowQualityBtn(!showQualityBtn)}>
        HD
      </div>
      {showQualityBtn && (
        <div className="quality-btn">
          {levels.map((level, index) => (
            <button key={index} onClick={() => changeQuality(index)}>
              {level.height}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;