import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotActions from '../../store/spots';
import {Redirect} from 'react-router-dom';

function UpdateSpotForm() {
    const spot = useSelector(state => state.spots.singleSpot);
    const [country, setCountry] = useState(spot.country);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [description, setDescription] = useState(spot.description);
    const [name, setName] = useState(spot.name);
    const [price, setPrice] = useState(spot.price);
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const updatedSpot = {
            country,
            address,
            city,
            state,
            description,
            name,
            price: +price
        }

        await dispatch(spotActions.updateSpot(spot.id, updatedSpot)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });

        setIsSubmitted(true);
    }

    if (isSubmitted) return <Redirect to={`/spotDetails/${spot.id}`} />

    return (
        <>

            <h1>Update Your Spot</h1>
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
                    <textarea required minLength='30' value={description} placeholder="Plese write at least 30 characters" onChange={(e) => setDescription(e.target.value)}></textarea>
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
                <button type="submit">Update Your Spot</button>

            </form>
        </>
    );
}

export default UpdateSpotForm;