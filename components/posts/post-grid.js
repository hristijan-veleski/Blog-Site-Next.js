import PostItem from "./post-item";
import classes from "./post-grid.module.css";

function PostGrid(props) {
  return (
    <ul className={classes.grid}>
      {props.posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default PostGrid;
