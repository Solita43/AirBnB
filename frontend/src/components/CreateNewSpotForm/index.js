import React, { useState } from "react";

function CreateNewSpotForm() {
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0.00);
    const [previewImage, setPreviewImage] = useState('');

    const handleSubmit = () => {
        e.prreventDefault();
    }

    return (
        <div id="create-spot-page">
            <h1>Create a new Spot</h1>
            <form>
                <div id='new-spot-location'>
                    <h2>Where's your place located?</h2>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                    <label>
                        Country
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)}></input>
                    </label>
                    <label>
                        Street Address
                        <input type='text' value={address} onChange={(e) => setAddress(e.target.value)}></input>
                    </label>
                    <lable>
                        City
                        <input type='text' value={city} onChange={(e) => setCity(e.target.value)}></input>, 
                    </lable>
                    <label>
                        State
                        <input type="text" value={state} onChange={(e) => setState(e.target.value)}></input>
                    </label>
                </div>

                <div id='describe-new-spot'>
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea placeholder="Plese write at least 30 characters"></textarea>
                </div>

                <div id="new-spot-title">
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>

                <div id='new-spot-price'>
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.
                    $ <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}></input> </p>
                </div>

                <div id='new-spot-photos'>
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input type="url" placeholder="Preview Image Url" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)}></input>
                </div>
                <button type="submit" onClick={handleSubmit}>Create a Spot</button>
            </form>
        </div>
    );
}

export default CreateNewSpotForm;