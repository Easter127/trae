import React, { useEffect, useRef } from 'react';

export default function RealTimeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // 苔藓/叶子粒子
    const particles: {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      rotation: number;
      rotationSpeed: number;
      size: number;
      color: string;
      type: number;
    }[] = [];

    // 初始化粒子
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 600,
        z: Math.random() * 500,
        vx: (Math.random() - 0.5) * 0.3,
        vy: Math.random() * 0.2 + 0.1,
        vz: (Math.random() - 0.5) * 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        size: Math.random() * 30 + 15,
        color: `hsl(${60 + Math.random() * 80}, ${40 + Math.random() * 30}%, ${30 + Math.random() * 30}%)`,
        type: Math.random() > 0.3 ? 0 : 1
      });
    }

    let time = 0;

    const animate = () => {
      time += 0.01;

      // 渐变背景
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, '#f0f7f0');
      bgGradient.addColorStop(0.5, '#e8f0e8');
      bgGradient.addColorStop(1, '#d7e0d7');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 计算透视
      const centerX = width / 2;
      const centerY = height / 2;
      const focalLength = 500;

      // 投影并绘制粒子
      const projected = particles.map((p, i) => {
        // 更新位置
        p.x += p.vx + Math.sin(time + i) * 0.1;
        p.y += p.vy + Math.cos(time * 0.7 + i * 0.3) * 0.05;
        p.z += p.vz;
        p.rotation += p.rotationSpeed;

        // 边界检查
        if (p.y > 400) p.y = -300;
        if (p.y < -300) p.y = 400;
        if (p.x > 600) p.x = -600;
        if (p.x < -600) p.x = 600;
        if (p.z > 500) p.z = 0;
        if (p.z < 0) p.z = 500;

        // 3D透视投影
        const scale = focalLength / (focalLength + p.z);
        const screenX = centerX + p.x * scale;
        const screenY = centerY + p.y * scale;
        const screenSize = p.size * scale;

        return {
          ...p,
          screenX,
          screenY,
          screenSize,
          scale
        };
      });

      // 按z轴排序（深度）
      projected.sort((a, b) => b.z - a.z);

      // 绘制粒子
      projected.forEach((p, i) => {
        const alpha = Math.max(0.3, 1 - p.z / 500);
        ctx.save();
        ctx.translate(p.screenX, p.screenY);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = alpha;

        if (p.type === 0) {
          // 苔藓/叶子形状
          const leafGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.screenSize);
          leafGradient.addColorStop(0, p.color);
          leafGradient.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = leafGradient;

          // 画叶子
          ctx.beginPath();
          ctx.ellipse(0, 0, p.screenSize, p.screenSize * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();

          // 添加叶脉
          ctx.strokeStyle = 'rgba(0,50,0,0.3)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-p.screenSize * 0.8, 0);
          ctx.lineTo(p.screenSize * 0.8, 0);
          ctx.stroke();
        } else {
          // 树枝/木片
          const barkGradient = ctx.createLinearGradient(-p.screenSize, 0, p.screenSize, 0);
          barkGradient.addColorStop(0, '#4a4a2a');
          barkGradient.addColorStop(0.5, '#6a6a4a');
          barkGradient.addColorStop(1, '#3a3a1a');
          ctx.fillStyle = barkGradient;

          ctx.fillRect(-p.screenSize * 1.5, -p.screenSize * 0.3, p.screenSize * 3, p.screenSize * 0.6);
        }

        ctx.restore();
      });

      // 添加光照效果
      const lightGradient = ctx.createRadialGradient(centerX - width * 0.2, centerY - height * 0.3, 50, centerX, centerY, width);
      lightGradient.addColorStop(0, 'rgba(255,255,200,0.4)');
      lightGradient.addColorStop(0.5, 'rgba(200,230,200,0.2)');
      lightGradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = lightGradient;
      ctx.fillRect(0, 0, width, height);

      // 添加暗角效果
      const vignetteGradient = ctx.createRadialGradient(centerX, centerY, height * 0.3, centerX, centerY, height);
      vignetteGradient.addColorStop(0, 'rgba(0,0,0,0)');
      vignetteGradient.addColorStop(1, 'rgba(0,0,0,0.4)');
      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, width, height);

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ display: 'block' }}
    />
  );
}
