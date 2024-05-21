import {UseBurgerBarContext} from "../context/burgerBarContext";
import {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";


const Menu = () => {
    const {menu_class} = UseBurgerBarContext()
    const [albums, setAlbums] = useState([]);
    const [cokkies] = useCookies()

    useEffect(() => {

        const fetchAlbum = async () => {
            try {
                const res = await axios.get("http://localhost:3001/albums");
                setAlbums(res.data);
            } catch (err) {
                console.log(err)
            }
        }

        fetchAlbum();
    }, [])

    return (
        <div className="menu">
            <h2 style={{color: "white"}}>Menu</h2>

            <ul className={menu_class}>
                {albums.map((album) => (
                    <li style={{color: "white"}} key={album._id}>{album.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Menu;
