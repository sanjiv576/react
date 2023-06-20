import { useCallback, useMemo, useRef, useState } from 'react';
import './App.css';
import Notes from './Notes';

function SortedList({ list, sortFunc }) {
  console.log('rendering sorted list');

  // sort and stores in new list
  const sortedNames = useMemo(
    // call back function what actions to be done as first parameter
    () => {
      console.log('recalling sorted names');
      return [...list].sort(sortFunc);
    },
    // depedency list as second parameter
    [list, sortFunc]);

    console.log(sortedNames)

  return (
    <div>
      {sortedNames.map(name => <li key={name}> {name}</li>)}
    </div>
  )
}



function App() {
  const [numbers] = useState([10, 20, 39]);

  const [count, setCount] = useState(0);

  const [names, setNames] = useState(['Ram', 'Hari', 'Sita', 'Gita']);

  // const [name, setName] = useState('');
  const total = useMemo(() => {
    console.log('Calculating total....');
    // return numbers.reduce((acc, curr) => acc + curr, 0);
    return numbers.reduce((acc, n) => acc + n, 0)

  }, [numbers]);

  // useCallback returns function
  // NOte: useCallback ==> does not change reference of function unitl it is changed
  const sortFunc = useCallback(
    // first parameter
    //  reverseing sort 
    (a, b) => a.localeCompare(b) * -1,
    // second parameter ==> executes only once as life cycle
    []
  );
  const inputRef = useRef(null);

  const addName = () => {
    // setNames(names.concat(name));
    setNames(names.concat(inputRef.current.value));
    // clearing input field
    // setName('');
    inputRef.current.value = '';
  }
  // NOte: everything renders twice becasue React team wants to make sure in Development environment
  return (
    <div className="App">
      {/* Note:  this executes twice becase  */}
      {/* <p>Total value {total}</p>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button> */}

      {/* uncontrolled elements ===> this element wont be tracked by React which does not render again again as input value is changes on changing */}
      <input
        type='text'
        ref={inputRef}
       placeholder='Enter name..'
      //  value={name}
      //  onChange={(e) => setName(e.target.value)}

      />
      <button onClick={addName}>Add name</button>

      <SortedList list={names} sortFunc={sortFunc} />

      <Notes />
    </div>
  );
}

export default App;
