import Navbar from "../common/Navbar/navbar";
import {useState} from "react";

// const 
const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleClick = async () => {
        if (!email || !password) {
            return;
        }
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/signup`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
    
            if (!res.ok) {
                throw new Error('Network response was not ok.');
            }
    
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error('Error during signup:', error.message);
        }
    }
    

    return (
        <div>
            <Navbar page='signup'/>
            <div>
                <input onChange={(e)=>setEmail(e.target.value)}/>
                <input onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={handleClick}>Signup</button>
            </div>
        </div>
    )
}

export default Signup;