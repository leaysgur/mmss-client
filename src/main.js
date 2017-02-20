// @flow
import LoginMain from './login/main';
const MmssMain = () => {};


fetch('/api/check')
  .then(res => res.json())
  .then(res => {
    switch (res.error) {
      case 3:
        LoginMain();
        break;
      default:
        MmssMain();
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
