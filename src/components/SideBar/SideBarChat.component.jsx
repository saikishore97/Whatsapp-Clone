import React,{useState,useEffect} from 'react';
import { Avatar } from '@material-ui/core';
import './SideBarChat.styles.css';
import db from '../../firebase';
import {Link} from 'react-router-dom';


const SideBarChat=({addNewChat,name,id})=>{
    
    const [seed,setSeed]=useState('');

    const createChat=()=>{
        const roomname=prompt("Please enter name for Chat Room");
        if(roomname){
            db.collection('rooms').add({
                name:roomname,
            });
        }
    };

    useEffect(() => {
        setSeed(Math.floor(Math.random()*6000));
    }, []);

    const [messages,setMessages] = useState('');


    useEffect(()=>{
        if(id){
            db.collection("rooms")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>
                setMessages(snapshot.docs.map((doc)=>doc.data()))
            );
        }
    },[id]);

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{messages[0]?.messsage}</p>
            </div>
            
        </div>
        </Link>

    ):
    (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    );
}

export default SideBarChat;