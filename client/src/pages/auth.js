import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useCookies } from "react-cookie";


const Auth = () => {

    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    )
};

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        if (!email.includes("@gmail.com") || password.length < 6) {
            alert("Email or password are incorrect")
            return null;
        }
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:3001/auth/login", {
                email,
                password,
            });

            setCookies("access_token", res.data.token);
            window.localStorage.setItem("userID", res.data.token);
            navigate("/");
        } catch (err) {
            console.error(err)
        }
    }

    const forgetPassword = (e) => {
        e.preventDefault();
        try{
            axios.post("http://localhost:3001/auth/forgot-password", {
                email: "danielkozac05@gmail.com"
            })
            alert("Password sent to your email")
        } catch (err) {
            console.error(err)
        }

    }

    return (
        <Form
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            label="Login"
            onSubmit={onSubmit}
            forgetPassword={forgetPassword}
        />
    );
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const onSubmit = async (e) => {
        e.preventDefault();
        if (!email.includes("@gmail.com") || password.length < 6) {
            alert("Email shoul contain @gmail.com, Password should be 6 characters min")
            return null;
        }
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                email,
                password,
            })
            alert("Registration completed! Now login.")
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <Form
            userName={username}
            setUsername={setUsername}
             email={email}
             setEmail={setEmail}
             password={password}
             setPassword={setPassword}
             label="Register"
             onSubmit={onSubmit}
        />
    );
};

const Form = ({
      userName,
      setUsername,
      email,
      setEmail,
      password,
      setPassword,
      label,
      onSubmit,
     forgetPassword,
}) => {
    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2> {label} </h2>

                {label.includes("Register") ?(
                    <div className="form-group">
                    <label htmlFor="username">UserName: </label>
                    <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}/>
                    </div>) : null
                }

                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit"> {label} </button>
                {label.includes('Login') && <button type="button" onClick={forgetPassword}> Забули пароль? </button>}
            </form>
        </div>
    )
}

export default Auth;
