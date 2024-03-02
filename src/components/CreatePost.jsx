import React, { useContext, useRef } from "react";
import { postListContext } from "../store/Post-list-store";
import { useNavigate, useParams } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const { addPost } = useContext(postListContext);

  const titleRef = useRef();
  const postContentRef = useRef();
  const userIdRef = useRef();
  const reactionsRef = useRef();
  const tagsRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const body = postContentRef.current.value;
    const userId = userIdRef.current.value;
    const reactions = reactionsRef.current.value;
    const tags = tagsRef.current.value.split(" ");

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        title,
        body,
        reactions,
        tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => addPost(post));
    navigate("/");

    titleRef.current.value = "";
    postContentRef.current.value = "";
    userIdRef.current.value = "";
    reactionsRef.current.value = "";
    tagsRef.current.value = "";
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          UserId
        </label>
        <input
          ref={userIdRef}
          type="text"
          className="form-control"
          id="userId"
          placeholder="Enter you userId"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          ref={titleRef}
          type="text"
          className="form-control"
          id="title"
          placeholder="Enter the title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          ref={postContentRef}
          type="text"
          rows="3"
          className="form-control"
          id="body"
          placeholder="Tell us about your self"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reactionss" className="form-label">
          Number of reactionss
        </label>
        <input
          ref={reactionsRef}
          type="text"
          className="form-control"
          id="reactionss"
          placeholder="How many people reacted to this post"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Tags
        </label>
        <input
          ref={tagsRef}
          type="text"
          className="form-control"
          id="tags"
          placeholder="Please enter your tags with space "
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
}

export default CreatePost;
