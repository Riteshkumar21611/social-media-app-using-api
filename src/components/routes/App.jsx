import React, { useContext, useState } from "react";
import "./App.css";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import CreatePost from "../CreatePost";
import PostList from "../PostList";
import PostListProvider from "../../store/Post-list-store";
import { Outlet } from "react-router-dom";

function App() {
  const [selected, setSelected] = useState("Home");

  return (
    <PostListProvider>
      <div className="app-container">
        <Sidebar selected={selected} setSelected={setSelected} />
        <div className="content">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
