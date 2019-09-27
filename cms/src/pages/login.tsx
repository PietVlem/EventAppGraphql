import React, { useState, useEffect } from 'react'
import firebase from "../services/firestore";

interface LoginProps{
    loggingIn: Function
}

const Login: React.FC<LoginProps> = ({ loggingIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: any) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((cred) => { 
            console.log(cred.user);
            loggingIn(true);
        })
        .catch((error) => {
            console.log({
                'errorCode': error.code,
                'errorMessage': error.message
            })
          });
        event.preventDefault();
    }

    return (
        <div className="main">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default Login;
