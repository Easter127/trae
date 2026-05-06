import React, { useEffect, useRef, useState } from 'react';

export default function ThreeJSFallbackBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    interface Particle {
      x: number; y: number; z: number; 
      vx: number; vy: number; vz: number; 
      rotation: number; rotationSpeed: number; 
      size: number; hue: number; 
      type: number;
    }

    // 创建粒子系统
    const particles: Particle[] = [];
    const particleCount = 3000;
    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      particles.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta) - 3,
        z: radius * Math.cos(phi),
        vx: (Math.random() - 0.5) * 0.02,
        vy: Math.random() * 0.01 + 0.005,
        vz: (Math.random() - 0.5) * 0.015,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        size: 0.08 + Math.random() * 0.2,
        hue: 60 + Math.random() * 80,
        type: Math.random() > 0.4 ? 0 : 1
      });
    }

    // 创建枝条
    const branches = [];
    for (let i = 0; i < 80; i++) {
      branches.push({
        x: (Math.random() - 0.5) * 15,
        y: -3 + Math.random() * 3,
        z: (Math.random() - 0.5) * 15,
        length: 1.5 + Math.random() * 3,
        thickness: 0.03 + Math.random() * 0.05,
        hue: 70 + Math.random() * 30,
        dirX: (Math.random() - 0.5) * 0.5,
        dirY: 0.5 + Math.random() * 0.5,
        dirZ: (Math.random() - 0.5) * 0.5
      });
    }

    // 孢子粒子
    const spores = [];
    for (let i = 0; i < 150; i++) {
      spores.push({
        x: (Math.random() - 0.5) * 25,
        y: Math.random() * 18 - 3,
        z: (Math.random() - 0.5) * 25,
        vx: (Math.random() - 0.5) * 0.015,
        vy: Math.random() * 0.015 + 0.005,
        vz: (Math.random() - 0.5) * 0.015,
        size: 0.05 + Math.random() * 0.1
      });
    }

    // 3D投影函数
    const project = (x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number) => {
      let nx = x, ny = y, nz = z;
      
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const tempY = ny * cosX - nz * sinX;
      nz = ny * sinX + nz * cosX;
      ny = tempY;
      
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const tempX = nx * cosY + nz * sinY;
      nz = -nx * sinY + nz * cosY;
      nx = tempX;
      
      const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);
      const tempX2 = nx * cosZ - ny * sinZ;
      ny = nx * sinZ + ny * cosZ;
      nx = tempX2;
      
      const focal = 600;
      const scale = focal / (focal + nz);
      return {
        x: width / 2 + nx * scale * 50,
        y: height / 2 + ny * scale * 50,
        scale,
        z: nz
      };
    };

    let time = 0;
    let rotX = 0, rotY = 0;
    let targetRotX = 0, targetRotY = 0;

    // 鼠标跟踪
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const mx = (e.clientX / width - 0.5) * 0.5;
      const my = (e.clientY / height - 0.5) * 0.3;
      targetRotY = mx;
      targetRotX = my;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      time += 0.016;
      
      // 平滑旋转
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      // 背景渐变
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#f5faf5');
      bgGrad.addColorStop(0.5, '#e8f0e8');
      bgGrad.addColorStop(1, '#d7e0d7');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 中心光晕
      const centerGrad = ctx.createRadialGradient(
        width / 2, height / 2 - 30, 50,
        width / 2, height / 2 - 30, 400
      );
      centerGrad.addColorStop(0, 'rgba(200, 230, 200, 0.6)');
      centerGrad.addColorStop(0.5, 'rgba(150, 200, 150, 0.3)');
      centerGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = centerGrad;
      ctx.fillRect(0, 0, width, height);

      // 绘制中心木片
      const woodProjected = project(0, -3, 0, rotX, rotY, 0);
      ctx.save();
      ctx.translate(woodProjected.x, woodProjected.y);
      const woodGrad = ctx.createLinearGradient(-150, 0, 150, 0);
      woodGrad.addColorStop(0, '#5a4a3a');
      woodGrad.addColorStop(0.5, '#6a5a4a');
      woodGrad.addColorStop(1, '#5a4a3a');
      ctx.fillStyle = woodGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, 150 * woodProjected.scale, 80 * woodProjected.scale, rotX * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 绘制枝条
      const sortedBranches = branches.map((b, i) => {
        const proj = project(b.x, b.y, b.z, rotX, rotY, 0);
        return { ...b, proj };
      }).sort((a, b) => b.proj.z - a.proj.z);

      sortedBranches.forEach(b => {
        const start = project(b.x, b.y, b.z, rotX, rotY, 0);
        const end = project(b.x + b.dirX * b.length, b.y + b.dirY * b.length, b.z + b.dirZ * b.length, rotX, rotY, 0);
        
        const alpha = Math.max(0.3, 1 - (start.z + 30) / 80);
        const hue = b.hue;
        
        ctx.strokeStyle = `hsla(${hue}, 50%, ${30 + alpha * 20}%, ${alpha})`;
        ctx.lineWidth = Math.max(1, b.thickness * start.scale * 80);
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      });

      // 绘制粒子
      const sortedParticles = particles.map((p, i) => {
        // 更新位置
        p.x += p.vx + Math.sin(time + i * 0.08) * 0.003;
        p.y += p.vy + Math.cos(time * 0.8 + i * 0.05) * 0.002;
        p.z += p.vz + Math.sin(time * 0.6 + i * 0.07) * 0.002;
        p.rotation += p.rotationSpeed;
        
        // 边界
        if (p.y > 8) p.y = -8;
        if (p.y < -8) p.y = 8;
        if (p.x > 12) p.x = -12;
        if (p.x < -12) p.x = 12;
        if (p.z > 12) p.z = -12;
        if (p.z < -12) p.z = 12;

        const proj = project(p.x, p.y, p.z, rotX, rotY, 0);
        return { ...p, proj };
      }).sort((a, b) => b.proj.z - a.proj.z);

      sortedParticles.forEach(p => {
        const alpha = Math.max(0.2, 1 - (p.proj.z + 30) / 80);
        const size = p.size * p.proj.scale * 40;
        const hue = p.hue + Math.sin(time * 0.5 + p.x) * 10;
        
        if (p.type === 0) {
          const grad = ctx.createRadialGradient(p.proj.x, p.proj.y, 0, p.proj.x, p.proj.y, size);
          grad.addColorStop(0, `hsla(${hue}, 60%, 70%, ${alpha * 0.9})`);
          grad.addColorStop(0.4, `hsla(${hue}, 55%, 55%, ${alpha * 0.6})`);
          grad.addColorStop(1, `hsla(${hue}, 50%, 40%, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.ellipse(p.proj.x, p.proj.y, size * 1.2, size * 0.8, p.rotation, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const grad = ctx.createRadialGradient(p.proj.x, p.proj.y, 0, p.proj.x, p.proj.y, size * 0.8);
          grad.addColorStop(0, `hsla(${hue - 10}, 55%, 60%, ${alpha * 0.8})`);
          grad.addColorStop(1, `hsla(${hue - 10}, 50%, 40%, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.proj.x, p.proj.y, size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 绘制孢子
      spores.forEach((s, i) => {
        s.x += s.vx;
        s.y += s.vy;
        s.z += s.vz;
        
        if (s.y > 12) s.y = -6;
        if (s.x > 13) s.x = -13;
        if (s.x < -13) s.x = 13;
        if (s.z > 13) s.z = -13;
        if (s.z < -13) s.z = 13;

        const proj = project(s.x, s.y, s.z, rotX, rotY, 0);
        const alpha = Math.max(0.15, 1 - (proj.z + 30) / 80);
        const size = s.size * proj.scale * 25;
        
        const grad = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, size);
        grad.addColorStop(0, `hsla(${90 + Math.sin(time + i) * 15}, 60%, 70%, ${alpha * 0.8})`);
        grad.addColorStop(1, 'hsla(90, 50%, 50%, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 光影效果
      const lightGrad = ctx.createRadialGradient(
        width * 0.3, height * 0.25, 50,
        width / 2, height / 2, width
      );
      lightGrad.addColorStop(0, 'rgba(255, 255, 220, 0.25)');
      lightGrad.addColorStop(0.4, 'rgba(220, 240, 220, 0.15)');
      lightGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, width, height);

      // 暗角
      const vignetteGrad = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.25,
        width / 2, height / 2, height * 0.7
      );
      vignetteGrad.addColorStop(0, 'rgba(0,0,0,0)');
      vignetteGrad.addColorStop(1, 'rgba(0,0,0,0.35)');
      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, 0, width, height);

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
