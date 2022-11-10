import logo from './logo.svg';
import './App.css';
import {create as createNotications} from './libs/firestore.js'
import {useCallback, useEffect, useRef, useState} from 'react' 

function App() {
  const notifications = createNotications('notifications-projector', '8efadabf-2efd-4a9d-a91a-a4fa73887dd1');
  const [id, setId] = useState('');
  const [ns, setNs] = useState([]);
  const [nsId, setNsIds] = useState([]);
  const isSubscribed = useRef(false);

  const fetchHistorical = useCallback((id) => {
    console.log('Fetching for id', id);
    notifications.getHistorical(7, id)    
  }, [])
  
  useEffect(() => {
    if (isSubscribed.current === true) return;
    isSubscribed.current = true;
    console.log('Subscribing');
    notifications.stream.map((d) => {
      // if (nsId.includes(d.id)) return;
      // setNsIds([...nsId,d.id]);
      // setNs([...ns, d])
      console.log({id: d.id, lastEvent: d.lastEvent})
    })
    notifications.subscribe(10);
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)}></input>
        <input type="button" value="Fetch Historical" onClick={()=>fetchHistorical(id)}></input>
        {/* {ns
          .sort((a,b) => new Date(a.date).valueOf() > new Date(b.date).valueOf())
          .map(n=>({id: n.id, lastEvent: n.lastEvent}))
          .map((d) => <p key={d.id}>{d.lastEvent}</p>)
        } */}

      </header>
    </div>
  );
}

export default App;
