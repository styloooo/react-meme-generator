import React from "react"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    // const [allMemeImages, setAllMemeImages] = React.useState(memesData)
    const [allMemes, setAllMemes] = React.useState({})
    
    React.useEffect(function() {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const newMemeURL = allMemes[randomNumber].url
        setMeme(oldMeme => {
            return {
                ...oldMeme,
                randomImage: newMemeURL
            }
        })
    }

    function handleMemeChange(event) {
        const {name, value} = event.target
        setMeme(oldMeme => {
            return {
                ...oldMeme,
                [name]: value
            }
        })
    }

    return (
        <main>
            <div className="meme--form">
                <input
                    type="text"
                    className="form--input"
                    placeholder="Top text"
                    name="topText"
                    onChange={handleMemeChange}
                    value={meme.topText}    
                />
                <input
                    type="text"
                    className="form--input"
                    placeholder="Bottom text"
                    name="bottomText"
                    onChange={handleMemeChange}
                    value={meme.bottomText}
                />
                <button
                    type="submit"
                    className="form--button"
                    onClick={getMemeImage}>
                    Get a new meme image &#x1F5BC;
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}
