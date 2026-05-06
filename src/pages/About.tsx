import { Link } from 'react-router-dom';
import { ArrowLeft, User, Briefcase, Heart, Coffee, Star } from 'lucide-react';
import ThreeBackground from '../components/ThreeBackground';

export default function About() {
  const skills = [
    { name: "React / Next.js", level: 95 },
    { name: "Three.js / WebGL", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "Tailwind CSS", level: 92 },
    { name: "Node.js", level: 85 },
    { name: "Python", level: 78 }
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <ThreeBackground />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              About Me
            </h1>

            <div className="grid gap-8">
              {/* 个人介绍 */}
              <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-cyan-400">👋 Hello!</h2>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  I'm a passionate creative developer who loves building immersive digital experiences. 
                  With a focus on WebGL and Three.js, I create websites that leave lasting impressions.
                </p>
              </div>

              {/* 技能展示 */}
              <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-cyan-400">🛠️ My Skills</h2>
                </div>
                <div className="space-y-5">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">{skill.name}</span>
                        <span className="text-cyan-400">{skill.level}%</span>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 兴趣爱好 */}
              <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-cyan-400">❤️ Things I Love</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["3D Art", "Open Source", "Photography", "Music", "Coffee", "Gaming", "Travel", "Reading"].map((item, i) => (
                    <div 
                      key={i}
                      className="bg-slate-700/50 rounded-xl p-4 text-center hover:bg-slate-600/50 transition-colors"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* 技术栈 */}
              <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Coffee className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-cyan-400">⚡ Tech Stack</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["React", "TypeScript", "Three.js", "Tailwind", "Vite", "Node.js", "Framer Motion", "GSAP"].map((tech, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 当前项目 */}
              <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-cyan-400">🚀 What I'm Working On</h2>
                </div>
                <p className="text-lg text-slate-300">
                  Currently exploring new possibilities with WebGL and building interactive 3D experiences. 
                  Always pushing the boundaries of what's possible on the web!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
