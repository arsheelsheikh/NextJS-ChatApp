import React, { useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from "axios";
import { route } from "next/dist/server/router";

export default function Auth() {

  const { username, secret, setUsername, setSecret } = useContext(Context);

  const router = useRouter();

  function onSubmit(e){
    e.preventDefault()
    if (username.lenght === 0 || secret.lenght === 0) return;

    axios
      .put (
        "https://api.chatengine.io/users/",
        { username, secret },
        { headers : { "Private-key" : "2858cb5d-700a-4d85-a1c5-c9766de8c1b2" }}
      )
      .then((r) => {
        router.push("/chats");
      });
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={e => onSubmit(e)}>
          <div className="auth-title">NextJS ChatApp</div>

          <div className="input-container">
            <input 
              placeholder="Username"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)}>
            </input>
          </div>  

          <div className="input-container">
            <input 
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={(e) => setSecret(e.target.value)}>
            </input>  
          </div>

          <button type="submit" className="submit-button">
            Login / Sign Up
          </button>


        </form>
      </div>
    </div>
  )
}
