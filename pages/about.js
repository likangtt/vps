// pages/about.js
import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import LanguageSwitcher from '../components/LanguageSwitcher';
import SEO from '../components/SEO';

export default function About() {
  const { t } = useTranslation('common');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <SEO 
        title={`${t('site.title')} - ${t('nav.about')}`}
        description={t('site.description')}
        keywords={t('site.keywords').split(',')}
      />
      
      {/* 导航栏 */}
      <nav className="bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50 border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <a className="text-2xl font-orbitron font-bold text-cyan-400">{t('site.title')}</a>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/">
                    <a className="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium">
                      {t('nav.home')}
                    </a>
                  </Link>
                  <Link href="/comparison">
                    <a className="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium">
                      {t('nav.comparison')}
                    </a>
                  </Link>
                  <Link href="/deals">
                    <a className="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium">
                      {t('nav.deals')}
                    </a>
                  </Link>
                  <Link href="/articles">
                    <a className="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium">
                      {t('nav.articles')}
                    </a>
                  </Link>
                  <Link href="/about">
                    <a className="text-white hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium">
                      {t('nav.about')}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>
      
      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-cyan-500/30 shadow-lg p-8">
          <h1 className="text-3xl font-orbitron font-bold text-cyan-400 mb-6">{t('nav.about')}</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg">
              {t('site.title')}是一个专业的VPS评测、比较和推荐平台，致力于帮助用户找到最适合自己需求的VPS服务器。
            </p>
            
            <h2>我们的使命</h2>
            <p>
              在云服务市场日益复杂的今天，选择合适的VPS服务器变得越来越困难。我们的使命是通过专业、客观的评测和比较，帮助用户在众多VPS提供商中做出明智的选择。
            </p>
            
            <h2>我们的价值观</h2>
            <ul>
              <li><strong>客观公正</strong> - 我们的评测基于实际使用体验和数据，不受任何VPS提供商的影响。</li>
              <li><strong>专业透明</strong> - 我们清晰地展示评测方法和标准，让用户了解我们的评测过程。</li>
              <li><strong>用户至上</strong> - 我们的首要目标是帮助用户找到最适合自己需求的VPS服务器。</li>
              <li><strong>持续更新</strong> - 我们定期更新VPS提供商的信息和评测，确保信息的时效性。</li>
            </ul>
            
            <h2>我们的团队</h2>
            <p>
              我们的团队由一群热爱技术的专业人士组成，他们在云服务、网络安全和性能优化等领域拥有丰富的经验。团队成员定期测试和评估各种VPS服务，确保我们的推荐基于最新的实际体验。
            </p>
            
            <h2>联系我们</h2>
            <p>
              如果您有任何问题、建议或合作意向，请随时与我们联系：
            </p>
            <ul>
              <li>邮箱：contact@vps-recommendation.com</li>
              <li>微信：VPSRecommend</li>
              <li>QQ群：123456789</li>
            </ul>
            
            <p>
              感谢您访问{t('site.title')}，我们期待能帮助您找到最适合的VPS服务器！
            </p>
          </div>
        </div>
      </div>
      
      {/* 页脚 */}
      <footer className="bg-gray-900 border-t border-cyan-500/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright').replace('2023', new Date().getFullYear())}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// 添加getStaticProps以支持服务端渲染翻译
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'zh', ['common'])),
    },
  };
}