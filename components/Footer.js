import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">VPS推荐</h3>
            <p className="text-gray-400">
              提供专业的VPS主机评测和推荐，帮助您选择最适合的VPS服务。
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li><Link href="/providers" className="text-gray-400 hover:text-white">VPS服务商</Link></li>
              <li><Link href="/guides" className="text-gray-400 hover:text-white">选择指南</Link></li>
              <li><Link href="/tutorials" className="text-gray-400 hover:text-white">教程</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white">博客</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">热门分类</h4>
            <ul className="space-y-2">
              <li><Link href="/guides/types" className="text-gray-400 hover:text-white">VPS类型</Link></li>
              <li><Link href="/guides/regions" className="text-gray-400 hover:text-white">地区选择</Link></li>
              <li><Link href="/discounts" className="text-gray-400 hover:text-white">优惠活动</Link></li>
              <li><Link href="/comparison" className="text-gray-400 hover:text-white">比较工具</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">联系我们</h4>
            <ul className="space-y-2 text-gray-400">
              <li>contact@vpsrecommendation.com</li>
              <li>微信: VPS推荐</li>
              <li>QQ群: 123456789</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} VPS推荐. 保留所有权利.</p>
          <div className="mt-2">
            <Link href="/privacy-policy" className="hover:text-white">隐私政策</Link>
            <span className="mx-2">|</span>
            <Link href="/terms-of-service" className="hover:text-white">服务条款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
