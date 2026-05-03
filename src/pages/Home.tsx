import { Link } from "react-router-dom";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Globe, 
  User,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const socialLinks = [
    { icon: Github, name: "GitHub", url: "https://github.com", color: "hover:text-white hover:bg-slate-700" },
    { icon: Twitter, name: "Twitter", url: "https://twitter.com", color: "hover:text-white hover:bg-sky-500" },
    { icon: Linkedin, name: "LinkedIn", url: "https://linkedin.com", color: "hover:text-white hover:bg-blue-600" },
    { icon: Globe, name: "Website", url: "#", color: "hover:text-white hover:bg-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* 导航栏 */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            My Portfolio
          </div>
          <Link 
            to="/about" 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-2"
          >
            关于我
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-12">
        {/* 英雄区 */}
        <section className="text-center mb-16 animate-fadeIn">
          <div className="relative inline-block mb-8">
            <div className="w-40 h-40 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <User className="w-20 h-20 text-white" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-50 blur-lg"></div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
            你好，我是开发者
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-8">
            热爱技术，专注于创造优秀的用户体验和高质量的代码
          </p>
        </section>

        {/* 社交媒体链接 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8 text-cyan-400">
            找到我
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-3 p-6 bg-slate-800/50 rounded-xl border border-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-xl ${social.color}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <social.icon className="w-10 h-10 text-slate-400" />
                <span className="font-medium">{social.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* 联系方式 */}
        <section className="max-w-xl mx-auto">
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="w-8 h-8 text-cyan-400" />
              <h2 className="text-2xl font-semibold">联系我</h2>
            </div>
            <p className="text-slate-300 mb-4">有任何问题或合作想法？</p>
            <a 
              href="mailto:hello@example.com"
              className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
            >
              hello@example.com
            </a>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-500">
        <p>© 2024 My Portfolio. 用 ❤️ 构建</p>
      </footer>

      {/* 简单的动画样式 */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
