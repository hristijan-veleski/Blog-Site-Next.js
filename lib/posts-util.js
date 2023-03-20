import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsPath = path.join(process.cwd(), "posts");

export function getAllPathNames() {
  return fs.readdirSync(postsPath);
}

export function getPost(postIdenfitier) {
  const postSlug = postIdenfitier.replace(/\.md$/, "");
  const postPath = path.join(postsPath, `${postSlug}.md`);
  const postData = fs.readFileSync(postPath, "utf-8");

  const { data, content } = matter(postData);

  const post = { slug: postSlug, ...data, content };
  return post;
}

export function getAllPosts() {
  const allPosts = getAllPathNames();

  const allPostsArr = allPosts.map((postName) => getPost(postName));

  const sortedPostsArr = allPostsArr.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPostsArr;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  return allPosts.filter((post) => post.isFeatured);
}
