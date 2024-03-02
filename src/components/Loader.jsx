import React from "react";

function Loader() {
  return (
    <div class="d-flex justify-content-center mt-5 ">
      <div
        class="spinner-border"
        style={{ width: "5rem", height: " 5rem" }}
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
