import React from 'react';
import {auth,provider} from '../firebase';
import './Login.styles.css';
import {Button} from '@material-ui/core';
import {useStateValue} from '../StateProvider';
import {actionTypes} from '../reducer';



const LoginPage=()=> {

    const[{user},dispatch]=useStateValue();

    const signIn=()=>{
        
        auth.signInWithPopup(provider)
        .then(result=>dispatch({
            type:actionTypes.SET_USER,
            payload:result.user
        })
        )
        .catch(error=>alert(error.message))
    };

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://img.icons8.com/fluent/96/000000/whatsapp.png" alt="WhatsappLogo"/>
                <div class="login__text">Sign In to Whatsapp</div>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    );
}

export default LoginPage;
