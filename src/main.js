// @flow
import { useStrict } from 'mobx';

import LoginMain from './login/main';
const MmssMain = () => { console.log('logined'); };


useStrict(true);

fetch('/api/check', {
    credentials: 'same-origin',
  })
  .then(res => res.json())
  .then(res => {
    if (res !== null) {
      return LoginMain();
    }

    MmssMain();
  })
  .catch(console.error);

// const YYYYMMDD = new Date().toJSON().split('T')[0].split('-').join('');
// fetch(`./dist/music.json?_=${YYYYMMDD}`)
//   .then((res) => res.json())
//   .then(() => {
//     const App = () => <div>Hello</div>;
//     ReactDOM.render(<App />, document.getElementById('root'));
//   });
