import {useEffect, useState} from "react";
import axios from "axios";
import Clock from "../components/clock";


const SavedAlbums = () => {
    const userID = "65894fba73298545336ca6a1";
    const [savedAlbums, setSavedAlbums] = useState([]);
    useEffect(() => {
        const fetchSavedAlbum = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3001/albums/savedAlbums/${userID}`
                );
                setSavedAlbums(res.data.savedAlbums);
            } catch (err) {
                console.log(err)
            }
        }

        fetchSavedAlbum();
    }, [])

    return (
        <div>
            <h2>Saved Albums</h2>
            <ul>
                {savedAlbums.map((album) => (
                    <li key={album._id}>
                        <div>
                            <h2>{album.name}</h2>
                        </div>
                        <div className="description">
                            <p>{album.description}</p>
                        </div>
                        <img src={album.imageUrl} alt={album.name}/>
                        <p>Album time: {album.albumTime} (minutes)</p>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default SavedAlbums;
