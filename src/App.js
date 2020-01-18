import React, { useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import axios from "axios";
const qs = require("query-string");

const App = () => {
  const [loggedIn, setLoggedIn] = useState();
  const [pictures, setPictures] = useState([])

  const getAuthWindow = () => {
    axios
      .get("https://api.instagram.com/oauth/authorize", {
        params: {
          client_id: "1458454804333593",
          redirect_uri: "https://wonderful-wozniak-d9d424.netlify.com/",
          scope: "user_profile,user_media",
          response_type: "code"
        }
      })
      .then(res => {
        window.location.href = res.request.responseURL;
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getAccesToken = () => {
    const queryString = window.location.search;
    const tempToken = queryString.slice(6);

    const url = "https://api.instagram.com/oauth/access_token";

    const requestBody = {
      client_id: "1458454804333593",
      grant_type: "authorization_code",
      redirect_uri: "https://wonderful-wozniak-d9d424.netlify.com/",
      client_secret: "84b5a7856a880e70e68ba4ee83afe0c4",
      code: tempToken
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    axios
      .post(url, qs.stringify(requestBody), config)
      .then(res => {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("user_id", res.data.user_id);
        setLoggedIn(true)
      })
      .then(() => {
        getPictures()
      })
      .catch(function(error) {
        console.log(error);
        
      });
  };

  const getPictures = () => {
    const access_token = localStorage.getItem("access_token")
    axios
      .get("https://graph.instagram.com/me/media", {
        params: {
          fields: "id,permalink,caption",
          access_token: access_token
        }
      })
      .then(res => {
        console.log(res.data)
        setPictures(res.data)
      })
      .catch(err => {
        console.log(err);
      });
  }

  const getLocalStorageToken = () => {
    if(localStorage.getItem("access_token")) {
      setLoggedIn(true)
    } else {
      getAccesToken()
    }
  }

  useEffect(() => {
    getLocalStorageToken();
  }, []);

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
      <div className="App">
        <h1>
          Max9{" "}
          <span role="img" aria-label="fire emoji">
            🔥
          </span>
        </h1>
        {loggedIn && loggedIn
          ? pictures.map(picture => {
            return <img key={picture.id} src={picture.permalink} alt={picture.caption} />
          })
          : <button onClick={() => getAuthWindow()}>Login</button>
        }
      </div>
    </UserContext.Provider>
  );
};

export default App;