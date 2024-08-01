import { React, useState, useEffect } from "react";
import axios from "axios";


export default function Meme() {

    useEffect(() => {
        axios.get("https://api.imgflip.com/get_memes")
            .then(res => setAllMemes(res.data.data.memes))
            .catch(err => console.log(err))
    }, [])
    //useEffect is getting all the meme images from an api 
    //[ ]empty dependency array means the effect will run once
    //once page changes useEffects runs

    function handleChange(e) {
        const { name, value } = e.target
        setMemes((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
        //handleChange is getting the inputs the user enters in
    }
    const [allMemes, setAllMemes] = useState([])

    console.log(allMemes)


    function memePicker() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        console.log(allMemes[randomNumber].url)
        setMemes(prevState => ({
            ...prevState,
            randomImage: allMemes[randomNumber].url
        }))
    }
    //memePicker function is randomly getting a meme image from allMemes
    const [memes, setMemes] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    //this is getting a form with a top text and a bottom text and it's getting an image from the api
    const [deleteTask, setDeleteTask] = useState(true)
    const handleDelete = () => {
        return setDeleteTask(prevState => !prevState)
    }
    //handle delete is getting the previous state and doing the opposite of that which is nothing
    const [savedMemes, setSavedMemes] = useState([])
    const memeList = savedMemes.map(meme => {
        //memelist is looking over all the saved memes in the array
        return (
            <>
                {deleteTask &&
                    <div className="savedMeme" style={{ backgroundImage: `url(${meme.randomImage})` }}>
                        <h1 id="saved--top" className="saved--meme--text">{meme.topText}</h1>
                        <h1 id="saved--bottom" className="saved--meme--text">{meme.bottomText}</h1>
                        <button id="delete--button" onClick={handleDelete}>X</button>
                    </div>
                }
            </>
        )
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setSavedMemes(prevSavedMemes => {
            return [
                ...prevSavedMemes,
                memes
            ]
        })
    }
    //this handle submit is getting the previous meme and inputs from user and its saving the meme




    return (
        <>
            <input className="input"
                placeholder="Top Text"
                name="topText"
                value={memes.topText}
                onChange={handleChange}
            />

            <input className="input"
                placeholder="Bottom Text"
                name="bottomText"
                value={memes.bottomText}
                onChange={handleChange}
            />
            <div id="meme--con" className="meme--container">
                <button onClick={() => memePicker()}>New Meme Image</button>
                <h3 id="top" className="meme--text">{memes.topText}</h3>
                <img src={memes.randomImage} alt="Meme image" className="meme--image"></img>
                <h3 id="bottom" className="meme--text">{memes.bottomText}</h3>
                <button onClick={handleSubmit}>Save Meme</button>
            </div>
            <div id="meme--list">{memeList}</div>
        </>

    )
}