// pages/tutorials/index.js
import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TutorialsPage() {
  return (
    <>
      <Head>
        <title>VPS教程指南</title>
        <meta name="description" content="详细的VPS选择和使用教程指南" />
      </Head>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">VPS教程指南</h1>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">1. 什么是VPS？</h2>
              <p className="text-gray-700">
                VPS（Virtual Private Server）即虚拟专用服务器，是将一台物理服务器分割成多个虚拟专用服务器的技术。
                每个VPS都可以独立运行操作系统，拥有独立的IP地址和系统资源。
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">2. 评测页面示例</h2>
              <p className="text-gray-700">
                在评测页面，我们会详细分析不同VPS提供商的性能、价格、客户服务等方面，
                帮助您做出明智的选择。
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">3. 如何选择适合的VPS？</h2>
              <p className="text-gray-700">
                选择VPS时需要考虑以下因素：
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>CPU和内存配置</li>
                <li>存储空间和类型（SSD/HDD）</li>
                <li>带宽限制</li>
                <li>数据中心位置</li>
                <li>价格和付款方式</li>
                <li>技术支持质量</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">4. VPS管理指南</h2>
              <p className="text-gray-700">
                购买VPS后，您需要了解如何管理您的服务器，包括：
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>连接到服务器（SSH）</li>
                <li>更新系统</li>
                <li>配置防火墙</li>
                <li>安装必要软件</li>
                <li>备份策略</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
