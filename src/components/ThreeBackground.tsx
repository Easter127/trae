import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  color: { h: number; s: number; l: number };
  size: number;
  life: number;
  maxLife: number;
}

interface WaveRing {
  radius: number;
  speed: number;
  opacity: number;
  hue: number;
}

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ringsRef = useRef<WaveRing[]>([]);
  const timeRef = useRef(0);
  const mouseXRef = useRef(0.5);
  const mouseYRef = useRef(0.5);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX / window.innerWidth;
      mouseYRef.current = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const particles: Particle[] = [];
    for (let i = 0; i < 5000; i++) {
      const radius = 5 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      particles.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02,
        color: { 
          h: 180 + Math.random() * 60, 
          s: 70 + Math.random() * 30, 
          l: 40 + Math.random() * 40 
        },
        size: 0.5 + Math.random() * 2,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 200
      });
    }
    particlesRef.current = particles;

    for (let i = 0; i < 8; i++) {
      ringsRef.current.push({
        radius: 50 + i * 80,
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.1 + Math.random() * 0.2,
        hue: 180 + i * 15
      });
    }

    const project3D = (x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number) => {
      let nx = x;
      let ny = y;
      let nz = z;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const tempY = ny * cosX - nz * sinX;
      const tempZ = ny * sinX + nz * cosX;
      ny = tempY;
      nz = tempZ;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const tempX = nx * cosY + nz * sinY;
      nz = -nx * sinY + nz * cosY;
      nx = tempX;

      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);
      const tempX2 = nx * cosZ - ny * sinZ;
      ny = nx * sinZ + ny * cosZ;
      nx = tempX2;

      const fov = 500;
      const scale = fov / (fov + nz);
      const screenX = window.innerWidth / 2 + nx * scale * 15;
      const screenY = window.innerHeight / 2 + ny * scale * 15;

      return { x: screenX, y: screenY, scale, z: nz };
    };

    const animate = () => {
      timeRef.current += 0.016;
      const time = timeRef.current;

      ctx.fillStyle = 'rgba(2, 6, 23, 0.15)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const rotX = time * 0.1 + Math.sin(time * 0.3) * 0.2;
      const rotY = time * 0.15 + Math.cos(time * 0.2) * 0.3;
      const rotZ = time * 0.05;

      const mouseX = (mouseXRef.current - 0.5) * 0.5;
      const mouseY = (mouseYRef.current - 0.5) * 0.5;

      ringsRef.current.forEach((ring, i) => {
        const pulseRadius = ring.radius + Math.sin(time * ring.speed + i) * 20;
        const projected = project3D(0, 0, 0, rotX + mouseY, rotY + mouseX, rotZ);
        
        ctx.beginPath();
        ctx.ellipse(
          projected.x, 
          projected.y, 
          pulseRadius * projected.scale, 
          pulseRadius * projected.scale * 0.4, 
          time * 0.2 + i * 0.5,
          0, 
          Math.PI * 2
        );
        ctx.strokeStyle = `hsla(${ring.hue + Math.sin(time) * 20}, 80%, 60%, ${ring.opacity * (1 - Math.abs(projected.z) / 50)})`;
        ctx.lineWidth = 1 + Math.sin(time * 2 + i) * 0.5;
        ctx.stroke();
      });

      const sortedParticles = particlesRef.current
        .map((p, i) => {
          const projected = project3D(
            p.x + Math.sin(time + i * 0.01) * 0.5,
            p.y + Math.cos(time + i * 0.01) * 0.5,
            p.z,
            rotX + mouseY,
            rotY + mouseX,
            rotZ
          );
          return { ...p, projected, index: i };
        })
        .sort((a, b) => b.projected.z - a.projected.z);

      sortedParticles.forEach((p) => {
        const { projected, color, size } = p;
        const depth = (projected.z + 30) / 60;
        const opacity = Math.max(0.1, Math.min(1, depth));
        const finalSize = size * projected.scale * (1 + Math.sin(time * 3 + p.index * 0.1) * 0.2);

        const gradient = ctx.createRadialGradient(
          projected.x, projected.y, 0,
          projected.x, projected.y, finalSize * 3
        );
        gradient.addColorStop(0, `hsla(${color.h + time * 10}, ${color.s}%, ${color.l + 20}%, ${opacity})`);
        gradient.addColorStop(0.5, `hsla(${color.h + time * 10}, ${color.s}%, ${color.l}%, ${opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${color.h + time * 10}, ${color.s}%, ${color.l}%, 0)`);

        ctx.beginPath();
        ctx.arc(projected.x, projected.y, finalSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      for (let i = 0; i < 5; i++) {
        const angle = time * 0.5 + (i / 5) * Math.PI * 2;
        const radius = 150 + Math.sin(time * 2 + i) * 30;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius * 0.5;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 80);
        gradient.addColorStop(0, `hsla(${200 + i * 20 + time * 20}, 100%, 70%, 0.3)`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(x, y, 80, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200);
      coreGradient.addColorStop(0, `hsla(${190 + Math.sin(time) * 20}, 100%, 70%, ${0.3 + Math.sin(time * 2) * 0.1})`);
      coreGradient.addColorStop(0.3, `hsla(${200 + Math.sin(time * 1.5) * 30}, 80%, 50%, 0.2)`);
      coreGradient.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      ctx.fillStyle = `rgba(0, 0, 0, ${0.1 + Math.sin(time * 0.5) * 0.05})`;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight * 0.1);
      ctx.fillRect(0, window.innerHeight * 0.9, window.innerWidth, window.innerHeight * 0.1);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'radial-gradient(ellipse at center, #0f172a 0%, #020617 100%)'
      }}
    />
  );
}
