import React, { useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import axios from "axios";
import styled from "styled-components";

const qs = require("query-string");

const App = () => {
  const [loggedIn, setLoggedIn] = useState();
  const [pictures, setPictures] = useState([]);

  const getAuthWindow = () => {
    axios
      .get("https://api.instagram.com/oauth/authorize", {
        params: {
          client_id: "1458454804333593",
          redirect_uri: "https://max9.netlify.com/",
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
      redirect_uri: "https://max9.netlify.com/",
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
        setLoggedIn(true);
      })
      .then(() => {
        getLongLivedAccessToken();
      })
      .then(async () => {
        const user_id = localStorage.getItem("user_id");
        const access_token = localStorage.getItem("access_token");
        postPictures(user_id, access_token);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const postPictures = (user_id, access_token) => {
    axios
      .post("http://localhost:7000/api/max9", {
        user_id: user_id,
        access_token: access_token
      })
      .then(async res => {
        getPictures(res.data.job_id)
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getPictures = (job_id) => {
    axios
      .get(`http://localhost:7000/api/max9/${job_id}`)
      .then(async res => {
        if(res.data.state === "waiting") {
          setTimeout(() => getPictures(parseInt(res.data.id), 1000));
        } else {
          setPictures(res.data.returnvalue)
        }
        alert('YES')
        // setPictures(res.data)
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getLongLivedAccessToken = async () => {
    const access_token = localStorage.getItem("access_token");
    axios
      .get("https://graph.instagram.com/access_token", {
        params: {
          grant_type: "ig_exchange_token",
          client_secret: "84b5a7856a880e70e68ba4ee83afe0c4",
          access_token: access_token
        }
      })
      .then(res => {
        localStorage.setItem("access_token", res.data.access_token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getLocalStorageToken = async () => {
    const user_id = localStorage.getItem("user_id");
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      setLoggedIn(true);
      postPictures(user_id, access_token);
    } else {
      getAccesToken();
    }
  };

  const deleteUserAuth = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    setLoggedIn(false);
  };

  useEffect(() => {
    getLocalStorageToken();
  }, []);

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
      <div className="App">
        <Max9>
          Max9{" "}
          <span role="img" aria-label="fire emoji">
            🔥
          </span>
        </Max9>
        {loggedIn && loggedIn ? (
          <Pics>
            {pictures
              .sort((a, b) => (parseInt(a.likes) < parseInt(b.likes) ? 1 : -1))
              .slice(0, 9)
              .map(pic => {
                return (
                  <Pic>
                    <a key={pic.id} href={pic.permalink}>
                      <img
                        width="200"
                        height="200"
                        src={
                          pic.media_type === "IMAGE" || "CAROUSEL_ALBUM"
                            ? pic.media_url
                            : pic.thumbnail_url
                        }
                        alt={pic.caption}
                      />
                    </a>
                  </Pic>
                );
              })}
            <button onClick={() => deleteUserAuth()}>Logout</button>
          </Pics>
        ) : (
          <Pics>
            <button onClick={() => getAuthWindow()}>Login</button>
          </Pics>
        )}
      </div>
    </UserContext.Provider>
  );
};

const Max9 = styled.h1`
  text-align: center;
  margin: 0 auto;
`;

const Pics = styled.div`
  margin: 0 auto;
  width: 600px;
  display: flex;
  flex-wrap: wrap;
`;

const Pic = styled.div`
  flex-grow: 1;
  width: 33%;
  height: 200px;
`;

export default App;
