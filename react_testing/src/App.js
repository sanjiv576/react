import logo from './logo.svg';
import './App.css';
import Skill from './components/Skill';
import Counter from './components/Counter';
import Notes from './components/Notes';

function App() {
  const skillsList = [
    { id: 1, name: 'plumbing' },
    { id: 2, name: 'wiring' },
    { id: 3, name: 'painting' },
  ]
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <div>

      {/* <Skill skills={skillsList} /> */}

      {/* <Counter /> */}

      <Notes/>
      


    </div>
  );
}

export default App;
