import { createContext, useReducer, useEffect, useState } from "react";
export const postListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  fetching: false,
});

const postReducer = (currentState, action) => {
  let newPostList = currentState;
  if (action.type === "DELETE_POST") {
    newPostList = currentState.filter((item) => item.id !== action.payload.id);
  } else if (action.type === "CREATE_POST") {
    newPostList = [action.payload, ...newPostList];
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatch] = useReducer(postReducer, []);

  const [fetching, setFetching] = useState(false);
  const addPost = (post) => {
    dispatch({
      type: "CREATE_POST",
      payload: post,
    });
  };

  const addPosts = (posts) => {
    dispatch({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };
  const deletePost = (id) => {
    dispatch({
      type: "DELETE_POST",
      payload: {
        id,
      },
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setFetching(true);
    fetch("https://dummyjson.com/post", { signal })
      .then((res) => res.json())
      .then((data) => {
        addPosts(data.posts);
        setFetching(false);
      })
      .catch((err) => {});
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <postListContext.Provider
      value={{
        postList,
        addPost,
        deletePost,
        fetching,
      }}
    >
      {children}
    </postListContext.Provider>
  );
};

export default PostListProvider;
