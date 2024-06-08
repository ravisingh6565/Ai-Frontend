import PointsContext from "../../context/pointsContext";
import Navbar from "../common/Navbar/navbar";
import {useState, useContext} from "react";

const Login = () => {
    const {login} = useContext(PointsContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleClick = async () => {
        if (!email || !password) {
            return;
        }
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
    
            if (!res.ok) {
                throw new Error('Network response was not ok.');
            }
    
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await res.json();
                console.log(data);
                if (data.status === "success") {
                    localStorage.setItem("authorization", data.data.token);
                    login();
                } else {
                    // Handle unsuccessful login
                    console.error('Login failed:', data.error);
                    // Optionally, set an error message for display
                }
            } else {
                throw new Error('Response is not in JSON format.');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            // Optionally, set an error message for display
        }
    }
    

    return (
        <div>
            <Navbar page='login'/>
            <div>
                <input onChange={(e)=>setEmail(e.target.value)}/>
                <input onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={handleClick}>Login</button>
            </div>
        </div>
    )
}

export default Login;