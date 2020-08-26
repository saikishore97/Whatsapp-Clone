import React,{useState,useEffect} from 'react';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import { Avatar, IconButton} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import SideBarChat from './SideBarChat.component';

import db from '../../firebase';

import './SideBar.styles.css';

import {useStateValue} from '../../StateProvider';

const SideBar=()=> {

    const [rooms,setRooms]=useState([]);
    const[{user},dispatch]=useStateValue();


    useEffect(()=>{
        const unsubscribe=db.collection('rooms').onSnapshot(snapshot=>
            setRooms(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            })))
        )
        return ()=>{
            unsubscribe();
        }
    },[]);

    return (
        <div className="sidebar">

            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>

                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start a new chat" type="text"></input> 
                </div>
            </div>

            <div className="sidebar__chats">
                <SideBarChat addNewChat/>
                {rooms.map(room=>(
                    <SideBarChat key={room.id} id={room.id} name={room.data.name}/>
                    )
                    )}
            </div>

        </div>
    );
}

export default SideBar;
