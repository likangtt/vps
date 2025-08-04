import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              VPS推荐
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/providers" className="text-gray-700 hover:text-blue-600 font-medium">
              VPS服务商
            </Link>
            <Link href="/guides" className="text-gray-700 hover:text-blue-600 font-medium">
              选择指南
            </Link>
            <Link href="/tutorials" className="text-gray-700 hover:text-blue-600 font-medium">
              教程
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium">
              博客
            </Link>
            <Link href="/discounts" className="text-gray-700 hover:text-blue-600 font-medium">
              优惠活动
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/search" className="text-gray-600 hover:text-blue-600">
              <FiSearch size={20} />
            </Link>
            <Link href="/comparison" className="btn">
              比较VPS
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <Link href="/providers" className="text-gray-700 hover:text-blue-600 font-medium">
                VPS服务商
              </Link>
              <Link href="/guides" className="text-gray-700 hover:text-blue-600 font-medium">
                选择指南
              </Link>
              <Link href="/tutorials" className="text-gray-700 hover:text-blue-600 font-medium">
                教程
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium">
                博客
              </Link>
              <Link href="/discounts" className="text-gray-700 hover:text-blue-600 font-medium">
                优惠活动
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
                <FiSearch className="mr-2" /> 搜索
              </Link>
              <Link href="/comparison" className="btn mt-2">
                比较VPS
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
