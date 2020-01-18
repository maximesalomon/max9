import React from 'react';
import axios from 'axios';

const App = (props) => {
  const getToken = () => {
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

  return (
    <div className="App">
      <h1>Max9 <span role="img" aria-label="fire emoji">🔥</span></h1>
      <button onClick={() => getToken()}>Login</button>
    </div>
  );
}

export default App;
