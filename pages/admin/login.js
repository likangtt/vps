// pages/admin/login.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // 在实际应用中，这里应该是一个API调用来验证用户凭据
      // 这里我们只是模拟登录成功
      if (username === 'admin' && password === 'admin123') {
        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 登录成功，重定向到仪表盘
        router.push('/admin/dashboard');
      } else {
        setError('用户名或密码不正确');
        setIsLoading(false);
      }
    } catch (error) {
      setError('登录时发生错误，请重试');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col justify-center">
      <Head>
        <title>管理员登录 | VPS推荐网</title>
        <meta name="description" content="VPS推荐网管理员登录" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="max-w-md w-full mx-auto px-4">
        <div className="text-center mb-8">
          <Link href="/">
            <span className="text-3xl font-orbitron font-bold text-cyan-400">VPS推荐网</span>
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-white">管理员登录</h1>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-cyan-500/30 shadow-lg p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-400">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
                用户名
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                密码
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '登录中...' : '登录'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <Link href="/">
              <span className="text-cyan-400 hover:text-cyan-300 text-sm">
                返回网站首页
              </span>
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} VPS推荐网. 保留所有权利.</p>
          <p className="mt-1">管理员账号: admin / 密码: admin123</p>
        </div>
      </div>
    </div>
  );
}