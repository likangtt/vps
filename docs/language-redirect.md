# 语言自动重定向功能说明

VPS推荐网站实现了智能的语言自动重定向功能，确保用户始终能够看到他们首选语言的内容。本文档详细说明了这一功能的工作原理。

## 重定向逻辑

系统通过以下优先级顺序确定用户的首选语言：

1. **用户明确选择的语言**：如果用户通过语言切换器明确选择了语言，系统会记住这个选择并优先使用。
2. **Cookie中保存的语言**：系统会检查Cookie中是否有NEXT_LOCALE值，如果有，则使用该语言。
3. **浏览器首选语言**：系统会检查用户浏览器的Accept-Language头，确定用户的首选语言。
4. **默认语言**：如果无法通过以上方式确定语言，系统会使用中文作为默认语言。

## 技术实现

### 1. Next.js中间件

我们使用Next.js中间件(middleware.js)在每个请求到达服务器之前拦截请求，并根据上述逻辑决定是否需要重定向：

```javascript
// middleware.js
import { NextResponse } from 'next/server';

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
  let locale = languageCookie || 
               (acceptLanguage.includes('zh') ? 'zh' : 'en') || 
               'zh';
  
  // 构建新的URL并重定向
  // ...
}
```

### 2. 语言上下文

在前端，我们使用LanguageContext.js管理语言状态，并在语言切换时同时更新本地存储和Cookie：

```javascript
const changeLanguage = (newLanguage) => {
  // 更新状态和i18n实例
  setLanguage(newLanguage);
  i18n.changeLanguage(newLanguage);
  
  // 更新路由
  router.push({ pathname, query }, asPath, { locale: newLanguage });
  
  // 保存到本地存储和Cookie
  localStorage.setItem('language', newLanguage);
  document.cookie = `NEXT_LOCALE=${newLanguage};path=/;max-age=${30 * 24 * 60 * 60}`;
};
```

### 3. Next.js i18n配置

在next.config.js中，我们配置了i18n支持：

```javascript
module.exports = {
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    localeDetection: true,
  },
  // ...
}
```

## 用户体验

这种实现方式确保了以下用户体验：

1. **首次访问**：用户首次访问网站时，系统会根据其浏览器语言设置自动重定向到相应的语言版本。
2. **语言切换**：用户手动切换语言后，系统会记住这个选择，并在后续访问中始终使用该语言。
3. **直接访问特定语言**：用户可以通过URL直接访问特定语言版本，例如`/en/about`访问英文版关于页面。

## 测试语言重定向

您可以通过以下方式测试语言重定向功能：

1. **清除Cookie和本地存储**：在浏览器中清除Cookie和本地存储，然后访问网站，系统应该根据您的浏览器语言设置自动重定向。
2. **修改浏览器语言**：在浏览器设置中修改首选语言，然后清除Cookie和本地存储，再次访问网站。
3. **手动切换语言**：使用网站上的语言切换器切换语言，然后刷新页面或关闭浏览器再次访问，系统应该记住您的选择。

## 注意事项

1. **搜索引擎优化**：语言重定向不会影响搜索引擎优化，因为我们使用了适当的hreflang标签和结构化数据。
2. **性能影响**：中间件会在每个请求之前执行，但其逻辑非常简单，不会对性能产生明显影响。
3. **禁用Cookie的用户**：对于禁用Cookie的用户，系统仍然可以通过浏览器语言设置提供适当的语言版本，但无法记住他们的语言选择。