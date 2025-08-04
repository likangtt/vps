// middleware.js
import { NextResponse } from 'next/server';

// 这个中间件会在每个请求之前执行
export function middleware(request) {
  // 获取请求的URL和路径
  const url = request.nextUrl.clone();
  const { pathname } = url;
  
  // 如果已经有语言前缀，则不需要重定向
  if (pathname.startsWith('/zh') || pathname.startsWith('/en')) {
    return NextResponse.next();
  }
  
  // 获取Accept-Language头
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // 检查Cookie中是否有语言设置
  const languageCookie = request.cookies.get('NEXT_LOCALE')?.value;
  
  // 确定要使用的语言
  let locale;
  
  // 首先检查Cookie
  if (languageCookie) {
    locale = languageCookie;
  } 
  // 然后检查Accept-Language头
  else if (acceptLanguage) {
    // 简单检查是否包含zh
    locale = acceptLanguage.includes('zh') ? 'zh' : 'en';
  } 
  // 默认使用中文
  else {
    locale = 'zh';
  }
  
  // 如果是默认语言(中文)且路径不是根路径，不需要重定向
  if (locale === 'zh' && pathname !== '/') {
    return NextResponse.next();
  }
  
  // 构建新的URL
  if (locale === 'zh') {
    // 中文是默认语言，重定向到不带前缀的URL
    url.pathname = pathname;
  } else {
    // 其他语言，添加语言前缀
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  }
  
  // 创建响应对象
  const response = NextResponse.redirect(url);
  
  // 设置Cookie，有效期30天
  response.cookies.set('NEXT_LOCALE', locale, { 
    maxAge: 30 * 24 * 60 * 60,
    path: '/' 
  });
  
  return response;
}

// 配置中间件应该在哪些路径上运行
export const config = {
  // 匹配所有路径，除了API路由、静态文件和_next路径
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.png$).*)'],
};