import { useEffect, useState } from "react";
import { getAuth, signInWithPopup } from 'firebase/auth';
import { app, googleAuthProvider } from '../../../../../../../../firebase'

const AuthProvider = () => {
    const auth = getAuth(app);
    const [user, setUser] = useState(auth.currentUser);
    // console.log();

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            if(user != null) {
                return setUser(user);
            }

            signInWithPopup(auth, googleAuthProvider)
                // .then(credentials => setUser(credentials.user))
                .then(credentials => console.log(credentials))
                .catch(error => console.error(error))
        })
        return unsub;
    }, [auth])

    return (
        <div>
            {
                user
                    ? <p>{user.displayName}</p>
                    : <p>loading</p>
            }
        </div>
    );
};

export default AuthProvider;