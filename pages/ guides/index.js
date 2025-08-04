import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const GuidesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-900 text-white">
      <Head>
        <title>VPS指南 | 专业选择指南</title>
      </Head>
      
      <nav className="backdrop-blur-sm bg-slate-900/80 border-b border-cyan-500/30">
        {/* 导航栏内容 */}
      </nav>
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">VPS选择指南</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/guides/regions" className="group">
            <div className="p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">地区选择指南</h2>
              <p className="text-slate-400">了解不同地区的VPS服务器特点与优势</p>
            </div>
          </Link>
          
          <Link href="/guides/types" className="group">
            <div className="p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">服务器类型指南</h2>
              <p className="text-slate-400">VPS、云服务器、专用服务器的区别与选择</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default GuidesPage;
