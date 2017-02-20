const React = require('react');
const ReactDOM = require('react-dom');

const LoginApp = () => <div>Login!</div>;
const MmssApp = () => <div>App!</div>;

fetch('/api/check')
  .then(res => res.json())
  .then(res => {
    if ('error' in res) {
      ReactDOM.render(<LoginApp />, document.getElementById('root'));
    } else {
      ReactDOM.render(<MmssApp />, document.getElementById('root'));
    }
  })
  .catch(console.error);


// const YYYYMMDD = new Date().toJSON().split('T')[0].split('-').join('');
// fetch(`./dist/music.json?_=${YYYYMMDD}`)
//   .then((res) => res.json())
//   .then(() => {
//     const App = () => <div>Hello</div>;
//     ReactDOM.render(<App />, document.getElementById('root'));
//   });

