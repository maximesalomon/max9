import React, { useState, useEffect } from 'react';
import { UserContext } from './contexts/UserContext';
import axios from 'axios';
const qs = require('query-string');

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

      const url = 'https://api.instagram.com/oauth/access_token'
      
      const requestBody = {
        client_id: '1458454804333593',
            grant_type: 'authorization_code',
            redirect_uri: 'https://wonderful-wozniak-d9d424.netlify.com/',
            client_secret: '84b5a7856a880e70e68ba4ee83afe0c4',
            code: 'AQDYFt-OHUXLQcUXCizNGrOwoZMZaM21x6youHV9dZ8j5iH4RilW_lqi7C6iedWoiWXRz2fl_Qcmx_ojV3sdPsAvVg9o5XhomkIhaFp6P0s-QhHOYzvz2DAD7sslCawEPMjG3pPdrwDTqRbmYnE6BdVZ9FOypGYc_ccfIKKSsiDzRr-CkZXp82ScDm7TaOTHeP8ZE-Y8TLsjGic8MfnQggwSIOrwqtMOWN5DuNg3X9uhZQ#_'
      }

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      axios.post(url, qs.stringify(requestBody), config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      // setLoggedIn(true)
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
