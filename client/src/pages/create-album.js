import {useState} from "react";

import {useNavigate} from "react-router-dom";

import axios from "axios";

import {UseGetUserID} from "../hooks/useGetUserID";
import {useCookies} from "react-cookie";




const CreateAlbum = () => {
    const userID = UseGetUserID();
    const navigate = useNavigate();
    const [cookies] = useCookies()

const [album, setAlbum] = useState({
    name: "",
    songs: [],
    description: "",
    imageUrl: "",
    albumTime: 0,
    userOwner: "65894fba73298545336ca6a1",
});



const handleChange = (e) => {
    const {id, value} = e.target;
    setAlbum(({...album, [id]: value}))
}

    const handleSongChange = (e, index) => {
        const {value} = e.target;
        const songs = album.songs;
        songs[index] = value
        setAlbum(({...album, songs}));

    }
const addSong = () => {
    setAlbum({...album, songs: [...album.songs, ""]})
}

const onSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:3001/albums", album,
            { headers: { authorization: cookies.access_token } });
        alert("Album Created")
        navigate("/")
    } catch (err) {
        console.error(err)
    }
}
    return (
        <div className="create-album">
            <h2> Create Album</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" onChange={handleChange} />
                <label htmlFor="songs">Songs</label>
                {album.songs.map((song, index) => (
                    <input
                        key={index}
                        type="text"
                        name="songs"
                        value={song}
                        onChange={(e) => handleSongChange(e, index)}
                    />
                ))}
                <button onClick={addSong} type="button">Add Songs</button>
                <label htmlFor="description">Description</label>
                <input type="text" id="description" onChange={handleChange}/>
                <label htmlFor="imageUrl">Image Url</label>
                <input type="text" id="imageUrl" onChange={handleChange}/>
                <label htmlFor="albumTime">Album Time (minutes)</label>
                <input type="number" id="albumTime" onChange={handleChange}/>
                <button  type="submit">
                    Upload Album
                </button>
            </form>
        </div>
    )
};

export default CreateAlbum;
