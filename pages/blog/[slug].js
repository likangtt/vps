import { getFileBySlug, getAllPosts } from '../../lib/posts';
import ReactMarkdown from 'react-markdown';

export default function BlogPost({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getFileBySlug(params.slug);
  return {
    props: {
      post,
    },
  };
}

