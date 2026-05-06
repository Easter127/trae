import React from 'react';
import ThreeJSFallbackBackground from './ThreeJSFallbackBackground';

// 尝试使用ThreeJS，失败则使用fallback
export default function ThreeJSBackground() {
  return <ThreeJSFallbackBackground />;
}
