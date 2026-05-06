import { useState, useEffect } from 'react';
import MossScene from '../components/MossScene';

export default function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* 苔藓3D背景 */}
      <MossScene />
      
      {/* 自定义光标 - 游戏风格 */}
      <div 
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorPosition.x - 40,
          top: cursorPosition.y - 40,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          transition: 'transform 0.2s ease-out'
        }}
      >
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border border-white/50 rounded-full" />
          <div className="absolute inset-2 border border-green-400/30 rounded-full animate-spin-slow" />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* 主内容层 */}
      <div className="relative z-20 h-screen flex flex-col justify-between items-center px-8 py-6">
        {/* 导航栏 */}
        <nav className="w-full flex justify-between items-center">
          <div className="text-xs tracking-[0.4em] uppercase text-white/60 font-mono hover:text-white transition-colors cursor-pointer">
            Ankward Corp.
          </div>
          <div className="flex gap-12 text-sm text-white/50 tracking-widest font-mono">
            <span 
              className="cursor-pointer hover:text-white transition-colors relative group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/80 group-hover:w-full transition-all duration-300" />
            </span>
            <span 
              className="cursor-pointer hover:text-white transition-colors relative group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              About moss
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/80 group-hover:w-full transition-all duration-300" />
            </span>
            <span 
              className="cursor-pointer hover:text-white transition-colors relative group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Login
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/80 group-hover:w-full transition-all duration-300" />
            </span>
          </div>
          {/* 菜单按钮 */}
          <div 
            className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 cursor-pointer group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="w-6 h-0.5 bg-white/50 group-hover:bg-white transition-all duration-300" />
            <div className="w-6 h-0.5 bg-white/50 group-hover:bg-white transition-all duration-300" />
          </div>
        </nav>

        {/* 主标题区域 */}
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-tight tracking-[0.2em]" 
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Time to style
            <br />
            <span className="italic tracking-[0.1em]">the moss industry</span>
          </h1>
        </div>

        {/* 底部信息 */}
        <div className="w-full flex justify-between items-end">
          <div className="text-xs text-white/40 tracking-widest font-mono">
            © 2024 Ankward Corp.
          </div>
          <div className="text-center">
            <button 
              className="px-8 py-3 bg-transparent border border-white/20 rounded-full text-sm tracking-[0.3em] uppercase font-mono hover:bg-white/5 hover:border-white/40 transition-all duration-300 relative group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="relative z-10">全屏观看</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 to-emerald-400/0 group-hover:from-green-400/20 group-hover:to-emerald-400/20 rounded-full transition-all duration-500" />
            </button>
          </div>
          <div className="text-xs text-white/40 tracking-widest font-mono">
            v1.0.0
          </div>
        </div>
      </div>

      {/* 播放按钮 - 和3D场景融为一体 */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <button className="group relative w-32 h-32 transition-all duration-500 hover:scale-110">
          {/* 发光效果 */}
          <div 
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(200,230,200,0.4) 0%, rgba(150,200,150,0.2) 50%, rgba(0,0,0,0) 70%)',
              boxShadow: '0 0 80px rgba(100,200,100,0.3)'
            }}
          />
          
          {/* 主体按钮 */}
          <div 
            className="absolute inset-2 rounded-full backdrop-blur-xl"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(230,240,230,0.7) 60%, rgba(0,0,0,0) 100%)',
              boxShadow: '0 0 40px rgba(200,230,200,0.4), inset 0 0 20px rgba(255,255,255,0.5)'
            }}
          />
          
          {/* 播放图标 */}
          <svg 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 text-black/70 group-hover:text-black group-hover:scale-110 transition-all duration-300 ml-1" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z"/>
          </svg>

          {/* 装饰圆环 */}
          <div className="absolute inset-0 border border-black/10 rounded-full group-hover:border-green-400/30 transition-colors duration-500" />
          <div className="absolute inset-2 border border-black/5 rounded-full" />
        </button>
      </div>

      {/* 游戏风格的粒子效果指示 */}
      <div className="fixed bottom-6 right-6 z-40 text-xs text-white/40 font-mono tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>实时渲染</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
          <span>鼠标交互激活</span>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
