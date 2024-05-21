import {useEffect, useState} from "react";
import axios from "axios";

import Clock from "../components/clock";
import {useCookies} from "react-cookie";

const Home = () => {
    const userID = "658bc5cf2890142213737e75";
    const [albums, setAlbums] = useState([]);
    const [savedAlbums, setSavedAlbums] = useState([]);
    const [cookies] = useCookies()
    useEffect(() => {

        const fetchAlbum = async () => {
            try {
                const res = await axios.get("http://localhost:3001/albums");
                setAlbums(res.data);
            } catch (err) {
                console.log(err)
            }
        }

        const fetchSavedAlbum = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3001/albums/savedAlbums/ids/${userID}`
                );
                setSavedAlbums(res.data.savedAlbums);
            } catch (err) {
                console.log(err)
            }
        }

        fetchAlbum();

        if (cookies.access_token) fetchSavedAlbum();
    }, [])


    const saveAlbum = async (albumID) => {
        try {
            const res = await axios.put("http://localhost:3001/albums", {
                albumID,
                userID,
            },
                { headers: { authorization: cookies.access_token } }
            );
            setSavedAlbums(res.data.savedAlbums)
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div>
            <h2>Albums</h2>
            <Clock />
            {!!albums.length ? <ul>
                {albums.map((album) => (
                    <li key={album._id}>

                        <div>
                            <h2>{album.name}</h2>
                            <button onClick={() => saveAlbum(album._id)}> Save
                            </button>
                        </div>
                        <div className="description">
                            <p>{album.description}</p>
                        </div>
                        <img src={album.imageUrl} alt={album.name}/>
                        <p>Album time: {album.albumTime} (minutes)</p>
                    </li>
                ))}
            </ul> : null}
        </div>
    )
};

export default Home;
