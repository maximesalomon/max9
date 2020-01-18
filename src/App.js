import React from 'react';
import axios from 'axios';

const getToken = () => {
  axios.post('https://api.instagram.com/oauth/authorize', {
    client_id: '814423029033574',
    redirect_uri: 'https://croissant.io',
    scope: 'user_profile,user_media',
    response_type: 'code'
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
}

const App = () => {
  return (
    <div className="App">
      <h1>Max9 <span role="img" aria-label="fire emoji">🔥</span></h1>
      <button onClick={() => getToken()}>Login</button>
    </div>
  );
}

export default App;
