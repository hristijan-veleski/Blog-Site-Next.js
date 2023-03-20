import Head from "next/head";
import { Fragment } from "react";
import PostContent from "../../components/posts/post-detail/post-content";
import { getAllPathNames, getPost } from "../../lib/posts-util";

function PostDetail(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excert} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const post = getPost(slug);

  return {
    props: { post },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const allPaths = getAllPathNames().map((pathName) => ({
    params: { slug: pathName.replace(/\.md$/, "") },
  }));
  return { paths: allPaths, fallback: false };
}

export default PostDetail;
