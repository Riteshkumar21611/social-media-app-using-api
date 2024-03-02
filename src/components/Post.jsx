import React, { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { postListContext } from "../store/Post-list-store";
function Post({ post }) {
  const { id, title, body, tags, reactions } = post;
  const { deletePost } = useContext(postListContext);
  return (
    <div className="card post-card" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(id)}
          >
            <AiFillDelete />
            <span className="visually-hidden">unread messages</span>
          </span>
        </h5>
        <p className="card-text">{body}</p>
        {tags.map((tag) => (
          <span className="badge text-bg-primary post-tags">{tag}</span>
        ))}
        <div key={id} className="alert alert-success reactions" role="alert">
          This post is reacted by {reactions} people
        </div>
      </div>
    </div>
  );
}

export default Post;
