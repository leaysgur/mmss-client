const React = require('react');
const ReactDOM = require('react-dom');

const LoginApp = require('./login/main.jsx');
const MmssApp = () => <div>App!</div>;

fetch('/api/check')
  .then(res => res.json())
  .then(res => {
    const App = 'error' in res ? LoginApp : MmssApp;
    ReactDOM.render(<App />, document.getElementById('root'));
  })
  .catch(console.error);

// const YYYYMMDD = new Date().toJSON().split('T')[0].split('-').join('');
// fetch(`./dist/music.json?_=${YYYYMMDD}`)
//   .then((res) => res.json())
//   .then(() => {
//     const App = () => <div>Hello</div>;
//     ReactDOM.render(<App />, document.getElementById('root'));
//   });
