import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'data/posts');

export function getAllPosts() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
      // 只处理.md文件
      if (fileName.endsWith('.md')) {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        return {
          slug,
          ...matterResult.data,
          content: matterResult.content,
        };
      }
      return null;
    }).filter(Boolean);
    return allPostsData;
  } catch (error) {
    // 如果目录不存在，返回空数组
    return [];
  }
}

export function getFileBySlug(slug) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      slug,
      ...matterResult.data,
      content: matterResult.content,
    };
  } catch (error) {
    // 如果文件不存在，返回一个默认对象或抛出错误（根据需求）
    return {
      title: 'Not Found',
      date: '',
      content: 'This post does not exist.',
    };
  }
}
