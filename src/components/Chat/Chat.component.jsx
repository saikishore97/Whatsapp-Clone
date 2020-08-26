import React,{useState,useEffect} from 'react';
import './Chat.styles.css';

import {Avatar,IconButton} from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';

import {useParams} from 'react-router-dom';

import db from '../../firebase';
import firebase from 'firebase';
import {useStateValue} from '../../StateProvider';


const Chat=()=> {
    const [seed,setSeed]=useState('');
    const [input,setInput]=useState('');
    const {roomId} = useParams();
    const [roomname,setRoomName]=useState('');
    const [messages,setMessages]=useState([]);
    const[{user},dispatch]=useStateValue();



    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                setRoomName(snapshot.data().name)
            ))
            db.collection('rooms').doc(roomId).collection('messages')
            .orderBy('timestamp','asc')
            .onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map(doc=>doc.data()))
            ))
        }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*6000));
    }, [roomId])

    const sendMessage=(event)=>{
        event.preventDefault();
        console.log("you typed>>>>> ",input);
        db.collection('rooms').doc(roomId).collection('messages').add({
           name:user.displayName,
           message:input,
           timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('');
    };

    return (
        <div className="chat">

            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerinfo">
                    <h3>{roomname}</h3>
                    <p>Last seen {" "}
                    {
                        new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()
                    }
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>

            </div>

            <div className="chat__body">
                {
                    messages.map(message=>(
                        <p 
                        className={`chat__message ${message.name===user.displayName?'chat_receiver':null}`}
                        >
                            <span className="chat__name">
                                {message.name}
                            </span>
                            {message.message}  
                            <span className="chat__timestamp">
                                {new Date(message.timestamp?.toDate()).toUTCString()}
                            </span> 
                        </p>
                    )
                    )
                }
                
            </div>

            
            
            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                    <input value={input} onChange={event=>setInput(event.target.value)} type="text" placeholder="Type a message"></input>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon/>


            </div>


        </div>
    );
}

export default Chat;
