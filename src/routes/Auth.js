import { authService } from "fbase";
import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (event) => {
        const {
            target : {name, value},
        } = event;

        if(name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            let data;

            if(newAccount) {
                //create newAccount
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else {
                //log in
                data = await authService.signInWithEmailAndPassword(email, password);
            }

            console.log(data);

        } catch (error) {
            console.log(error);
        }
       
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required/>
                <input type="password" name="password" value={password} onChange={onChange} placeholder="password" required/>
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            </form>
            <div>
                <button>Contivue with Google</button>
                <button>Contivue with Github</button>
            </div>
        </div>
        
    );
};

export default Auth;