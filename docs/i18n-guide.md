# Next.js i18n 国际化指南

本指南将帮助您了解如何在VPS推荐网站中使用next-i18next进行国际化。

## 已实现的国际化功能

我们已经为您的网站实现了以下国际化功能：

1. **多语言路由** - 使用Next.js内置的i18n路由功能，自动为不同语言版本生成对应的URL
2. **翻译文件** - 在`public/locales`目录下为每种语言创建翻译文件
3. **语言切换器** - 实现了语言切换组件，允许用户在不同语言之间切换
4. **语言检测** - 自动检测用户的浏览器语言，并提供相应的语言版本
5. **SEO优化** - 为不同语言版本提供适当的元标签和结构化数据

## 目录结构

```
├── public/
│   └── locales/
│       ├── zh/
│       │   └── common.json
│       └── en/
│           └── common.json
├── next-i18next.config.js
└── contexts/
    └── LanguageContext.js
```

## 如何使用

### 1. 在页面中使用翻译

```jsx
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function MyPage() {
  const { t } = useTranslation('common');
  
  return (
    <div>
      <h1>{t('page.title')}</h1>
      <p>{t('page.description')}</p>
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
```

### 2. 添加新的翻译

1. 在`public/locales/zh/common.json`和`public/locales/en/common.json`中添加新的翻译键值对
2. 使用嵌套结构组织翻译，例如：

```json
{
  "page": {
    "title": "页面标题",
    "description": "页面描述"
  }
}
```

### 3. 添加新的语言

1. 在`next-i18next.config.js`中添加新的语言：

```js
module.exports = {
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'ja'], // 添加日语
  },
  // ...
};
```

2. 在`public/locales`目录下创建新的语言目录和翻译文件：

```
public/locales/ja/common.json
```

### 4. 使用多个命名空间

如果您需要将翻译分成多个文件，可以使用命名空间：

1. 创建新的翻译文件：

```
public/locales/zh/home.json
public/locales/en/home.json
```

2. 在页面中使用多个命名空间：

```jsx
import { useTranslation } from 'next-i18next';

export default function Home() {
  const { t } = useTranslation(['common', 'home']);
  
  return (
    <div>
      <h1>{t('home:title')}</h1>
      <p>{t('common:site.description')}</p>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'zh', ['common', 'home'])),
    },
  };
}
```

## 最佳实践

1. **使用嵌套结构** - 使用嵌套结构组织翻译，避免键名冲突
2. **使用命名空间** - 将不同页面或功能的翻译分成不同的命名空间
3. **使用插值** - 使用插值功能处理动态内容：

```jsx
// 翻译文件
{
  "welcome": "欢迎，{{name}}！"
}

// 组件中
t('welcome', { name: 'John' }) // 输出：欢迎，John！
```

4. **处理复数形式** - 使用复数形式处理数量变化：

```jsx
// 翻译文件
{
  "items": {
    "one": "{{count}}个项目",
    "other": "{{count}}个项目"
  }
}

// 组件中
t('items', { count: 1 }) // 输出：1个项目
t('items', { count: 5 }) // 输出：5个项目
```

5. **使用HTML内容** - 处理包含HTML的翻译：

```jsx
// 翻译文件
{
  "terms": "我同意<link>服务条款</link>"
}

// 组件中
const Trans = require('react-i18next').Trans;

<Trans i18nKey="terms" components={{ link: <a href="/terms" /> }} />
```

## 常见问题解答

### 如何处理日期和数字格式？

使用`Intl`API处理日期和数字格式：

```jsx
// 日期格式化
const date = new Date();
const formattedDate = new Intl.DateTimeFormat(language, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(date);

// 数字格式化
const number = 1234567.89;
const formattedNumber = new Intl.NumberFormat(language, {
  style: 'currency',
  currency: 'CNY'
}).format(number);
```

### 如何处理动态内容的翻译？

对于从API获取的动态内容，可以在后端为每种语言准备不同的内容，或者使用翻译服务在前端进行翻译。

### 如何处理图片和其他资源的国际化？

可以根据语言加载不同的图片：

```jsx
const imagePath = language === 'zh' ? '/images/banner-zh.jpg' : '/images/banner-en.jpg';
```

或者使用CSS根据语言选择器显示不同的图片：

```css
:lang(zh) .banner {
  background-image: url('/images/banner-zh.jpg');
}

:lang(en) .banner {
  background-image: url('/images/banner-en.jpg');
}
```

## 结论

通过使用next-i18next，您的VPS推荐网站现在可以支持多种语言，提供更好的用户体验，并扩大潜在用户群体。随着网站的发展，您可以轻松添加更多语言和翻译内容。