import React, { useContext } from "react";
import Post from "./Post";
import { postListContext } from "../store/Post-list-store";
import ErrorMsg from "./ErrorMsg";
import Loader from "./Loader";

function PostList() {
  const { postList, fetching } = useContext(postListContext);

  return (
    <>
      {fetching && <Loader />}

      {!fetching && postList.length === 0 ? (
        <ErrorMsg />
      ) : (
        <div>
          {!fetching &&
            postList.map((currItem) => (
              <Post key={currItem?.id} post={currItem} />
            ))}
        </div>
      )}
    </>
  );
}

export default PostList;
