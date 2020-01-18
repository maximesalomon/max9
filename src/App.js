import React, { useState } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import { Route } from 'react-router-dom';

const App = (props) => {
  const [IGURL, setIGURL] = useState()
  const getToken = () => {
    axios.get('https://api.instagram.com/oauth/authorize', {
      params: {
      client_id: '814423029033574',
      redirect_uri: 'https://croissant.io',
      scope: 'user_profile,user_media',
      response_type: 'code'
    }})
    .then(res => {
      console.log(res.request.responseURL);
      setIGURL(res.request.responseURL)
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div className="App">
      <h1>Max9 <span role="img" aria-label="fire emoji">🔥</span></h1>
      <button onClick={() => getToken()}>Login</button>
      <a href={IGURL}><button>Go to Instagram to login</button></a>
    </div>
  );
}

export default App;
