import React, { useState } from 'react';
import "./chart.css"
import { IconButton, Avatar } from '@material-ui/core';
import { AttachFile,  InsertEmoticon,  MoreVert } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import { Mic } from '@material-ui/icons';
import axios from './axios';

function Chart({messages}) {

    const [input ,setInput]= useState("")

    const sendMessage = async (e)=>{
        e.preventDefault();  //doesnot refresh

        await axios.post('/messages/new',{
            message: input,
            name: "Saheen Jasmine",
            timestamp: "Just now!",
            received: false,
        });

        setInput("");
    }

    return (
        <div className="chart">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h3>Saheen</h3>
                    <p>Last Seen at..</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon/>
                        </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>

                </div>
            </div>

            <div className="chat__body">
            {messages.map((message) =>(
                <p className={`chat__message ${message.received && "chat__reciever"} `}>
                    <span className="chat__name">
                        {message.name}
                    </span>
                    {message.message}
                    <span className="chat__timestamp">
                    {message.timestamp}
                    </span>
                </p>
            ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send a Message </button>
                </form>
                <Mic/>
            </div>
        </div>
    )
}

export default Chart;
