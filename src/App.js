import './App.css';
import Sidebar from './Sidebar';
import Chart from './Chart';
import Pusher from "pusher-js"
import { useEffect, useState } from 'react';
import axios from "axios"


function App() {

  const [messages, setMessages]= useState([]);

  useEffect(()=>{
    axios.get("/message/sync").then((response )=>{
      setMessages(response.data);
    })
  },[])

  useEffect(() => {
    const pusher = new Pusher('b8abdbc59a352313e973', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('message');
    channel.bind("inserted", (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  } , [messages]
   );

  console.log(messages)

  return (
    <>
    <div className="app">
        <div className="app__body">
          <Sidebar />
          <Chart messages={ messages}/>
        </div>
    </div>
    </>
  );
}

export default App