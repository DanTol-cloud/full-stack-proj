import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BurgerMenu from "./burgerMenu";
import {useEffect, useState} from "react";
import axios from "axios";
const Navbar = () => {
    const userID = "658bc5cf2890142213737e75";
    const [cookies, setCookies] = useCookies(["access_token"])
    const [admin, setAdmin] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/auth/users/${userID}`);
                setAdmin(res.data.admin);
            } catch (err) {
                console.log(err)
            }
        }
        fetchAdmin()
    })
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("UserID");
        navigate("/auth")
    }

    return (
        <div className="navbar">
            <BurgerMenu />
            <Link className="link" to="/"> Home </Link>
            {admin && <Link className="link" to="/create-album"> Create Album </Link>}
            {!cookies.access_token ?
                (
                    <Link className="link" to="/auth">
                        Login/Register
                    </Link>
                ) : (
                    <>
                        <Link className="link" to="/saved-albums"> Saved Albums </Link>
                        <button className="logout" onClick={logout}>
                            Logout
                        </button>
                    </>
                )
            }
        </div>
    )
}

export default Navbar;
