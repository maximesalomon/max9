import React, { useState, useEffect } from 'react';
import { UserContext } from './contexts/UserContext';
import axios from 'axios';

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)

  const getAuthWindow = () => {
    axios.get('https://api.instagram.com/oauth/authorize', {
      params: {
      client_id: '1458454804333593',
      redirect_uri: 'https://wonderful-wozniak-d9d424.netlify.com/',
      scope: 'user_profile,user_media',
      response_type: 'code'
    }})
    .then(res => {
      window.location.href = res.request.responseURL
    })
    .catch(err => {
      console.log(err);
    });
  }

  const getToken = () => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true)
    } else {
      const queryString = window.location.search;
      const token = queryString.slice(6);
      token && localStorage.setItem("token", token)
      token && setLoggedIn(true)
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <UserContext.Provider value={{loggedIn, setLoggedIn}}>
      <div className="App">
        <h1>Max9 <span role="img" aria-label="fire emoji">🔥</span></h1>
        {
          loggedIn
          ? <p>You are logged in :)</p>
          : <button onClick={() => getAuthWindow()}>Login</button>
        }
      </div>
    </UserContext.Provider>
  );
}

export default App;
