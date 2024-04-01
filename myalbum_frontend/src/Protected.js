import React, { useState, useEffect, useRef } from "react";

import classes from "./components/LoginForm.module.scss";
import { useAuth } from "./AuthContext";
import MyDropzone from "./components/MyDropzone";
import Gallery from "./components/Gallery";

function Protected() {
  const { logout, user } = useAuth();
  const [display, setDisplay] = useState("Loading..."); // Initialize with a loading message or empty

  useEffect(() => {
    // Update the `display` state based on user authentication status
    if (user) {
      setDisplay(`You are authenticated, user name: ${user}`);
    } else {
      setDisplay("You don't have permission");
    }
  }, [user]); // Dependency array ensures this effect runs when `user` changes

  const uploadPicRef = useRef();
  const uploadPic = () => {
    if (uploadPicRef.current) {
      uploadPicRef.current.uploadPic();
    }
  };
  return (
    <div>
      <p>{display}</p> {/* Use paragraph to wrap the display text */}
      {user && (
        <>
          <MyDropzone ref={uploadPicRef}></MyDropzone>
          <button
            type="button"
            className={classes.loginBtn} // Uncomment when you've defined your CSS module
            onClick={uploadPic}
            style={{ marginBottom: "20px" }}
          >
            uploadPic
          </button>
          <Gallery></Gallery>
          <button
            type="button"
            className={classes.loginBtn} // Uncomment when you've defined your CSS module
            onClick={() => logout()}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Protected;
