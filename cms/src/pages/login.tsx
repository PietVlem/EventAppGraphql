import React, { useState } from 'react'
import firebase from "../services/firestore";

interface LoginProps {
    loggingIn: Function
}

const Login: React.FC<LoginProps> = ({ loggingIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: any) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((cred) => {
                // console.log(cred.user);
                localStorage.setItem('graphqlApp_signedIn', 'true')
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
        <div className="main main--login">
            <div className="container container--login">
                <form onSubmit={handleSubmit}>
                    <div className="form-fields">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                placeholder="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="button button--default">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
