import React, { useState } from 'react';

export default function VideoBackground() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 背景图片 - 自然苔藓风格 */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1543536448-d209d09606ce?w=1920&h=1080&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* 渐变叠加 - 让文字更清晰 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)'
        }}
      />

      {/* 播放按钮覆盖层 */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      )}

      {/* 视频元素 - 播放时显示 */}
      {isPlaying && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source 
            src="https://cdn.mixkit.co/videos/preview/mixkit-dew-drops-on-green-leaves-4211-large.mp4" 
            type="video/mp4" 
          />
        </video>
      )}
    </div>
  );
}
