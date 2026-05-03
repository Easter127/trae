import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          回到首页
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            关于我
          </h1>

          <div className="space-y-6 text-lg text-slate-300">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-semibold text-cyan-400 mb-3">👋 你好！</h2>
              <p>
                我是一个热爱技术和创造的人。这个网页就是我用现代前端技术栈搭建的个人展示页面。
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-semibold text-cyan-400 mb-3">🎯 我的兴趣</h2>
              <ul className="space-y-2 ml-4">
                <li>• 前端开发和用户体验设计</li>
                <li>• 学习新技术和最佳实践</li>
                <li>• 创造有趣且实用的东西</li>
                <li>• 探索开源社区</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-semibold text-cyan-400 mb-3">🛠️ 技术栈</h2>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-blue-700 rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-cyan-600 rounded-full text-sm">Tailwind CSS</span>
                <span className="px-3 py-1 bg-purple-600 rounded-full text-sm">Vite</span>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-semibold text-cyan-400 mb-3">🚀 目前在做的</h2>
              <p>
                我一直在学习和成长，不断探索新的可能性。如果你有有趣的项目或想法，欢迎联系我！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
