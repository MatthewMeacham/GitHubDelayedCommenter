import React from 'react';
import './App.scss';
import HelloWorld from './components/HelloWorld/HelloWorld';

const CLIENT_ID = '11568701cffaa9e8a711';
const REDIRECT_URI = 'http://localhost:3000/';

const API_BASE_URL = 'http://localhost:62797/api';

export default class App extends React.Component {
  
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('code')) {
      const code = urlParams.get('code');
      fetch(`${API_BASE_URL}/authenticate/github?code=${code}`)
        .then((response) => console.log(response));
    }
  }

  render() {
    // TODO: Should to specify scope for the github oauth request
    return (
      <div className="App">
        <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`}>
          Login
        </a>
  
        <HelloWorld message="Matthew" />
      </div>
    );
  }
  
}
