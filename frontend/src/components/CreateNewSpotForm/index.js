import React, { useState } from "react";
import * as spotActions from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { csrfFetch } from "../../store/csrf";

function CreateNewSpotForm() {
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState({});
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();
    const history = useHistory();



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const spot = {
            country,
            address,
            city,
            state,
            description,
            name,
            price: +price
        }

        const data = await dispatch(spotActions.createSpot(spot)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });

        if (!Object.keys(errors).length) {
            csrfFetch(`/api/spots/${data.id}/images`, {
                method: 'POST',
                body: JSON.stringify(previewImage)
            }).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
                return
            });

        }

        history.push(`/spotDetails/${data.id}`);
    }



    const makeImageObj = (url, preview) => {
        return { url, preview }
    }

    return (
        <div id="create-spot-page">
            <h1>Create a new Spot</h1>
            <form onSubmit={handleSubmit}>
                <div id='new-spot-location'>
                    <h2>Where's your place located?</h2>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                    <label>
                        Country
                        <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)}></input>
                    </label>
                    <label>
                        Street Address
                        <input type='text' required value={address} onChange={(e) => setAddress(e.target.value)}></input>
                    </label>
                    <label>
                        City
                        <input type='text' required value={city} onChange={(e) => setCity(e.target.value)}></input>,
                    </label>
                    <label>
                        State
                        <input type="text" required value={state} onChange={(e) => setState(e.target.value)}></input>
                    </label>
                </div>

                <div id='describe-new-spot'>
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea required minLength='30' placeholder="Plese write at least 30 characters" onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div id="new-spot-title">
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input type='text' required maxLength='50' value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>

                <div id='new-spot-price'>
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.<br></br>
                        $ <input type="text" required value={price} onChange={(e) => setPrice(e.target.value)}></input> </p>
                </div>

                <div id='new-spot-photos'>
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input type="url" placeholder="Preview Image Url" onChange={(e) => {
                        const obj = makeImageObj(e.target.value, true);
                        setPreviewImage(obj);
                    }} required>
                    </input>
                </div>
                <button type="submit">Create a Spot</button>
            </form>
        </div>
    );
}

export default CreateNewSpotForm;