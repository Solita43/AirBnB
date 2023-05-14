import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotActions from '../../store/spots';
import { Redirect, useParams } from 'react-router-dom';

function UpdateSpotForm() {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();
    const [isSubmitted, setIsSubmitted] = useState(false)

    const populateForm = (spot) => {
        setCountry(spot.country);
        setAddress(spot.address);
        setCity(spot.city);
        setState(spot.state);
        setDescription(spot.description);
        setName(spot.name);
        setPrice(spot.price)
    }

    useEffect(() => {
        if (!spot) dispatch(spotActions.getSpotDetails(spotId)).then((res) => populateForm(res))
        else populateForm(spot);
        // eslint-disable-next-line
    }, [])


    if (!spot) return null;


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const updatedSpot = {
            country: country.trim(),
            address: address.trim(),
            city: city.trim(),
            state: state.trim(),
            description: description.trim(),
            name: name.trim(),
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
            <form id='update_spot_form' onSubmit={handleSubmit}>
                <h1 id='update_spot_title'>Update Your Spot</h1>
                {errors.message && (<p className="errors">{errors.message}</p>)}
                {errors.country && (<p className="errors">{errors.country}</p>)}
                {errors.address && (<p className="errors">{errors.address}</p>)}
                {errors.city && (<p className="errors">{errors.city}</p>)}
                {errors.state && (<p className="errors">{errors.state}</p>)}
                {errors.description && (<p className="errors">{errors.description}</p>)}
                {errors.name && (<p className="errors">{errors.name}</p>)}
                {errors.price && (<p className="errors">{errors.price}</p>)}
                <div id='new-spot-location'>
                    <h3>Where's your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                    <label>
                        Country
                        <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)}></input>
                    </label>
                    <label>
                        Street Address
                        <input type='text' required value={address} onChange={(e) => setAddress(e.target.value)}></input>
                    </label>
                    <div id='city_state'>

                        <label>
                            City
                            <input type='text' id='city' required value={city} onChange={(e) => setCity(e.target.value)}></input>
                        </label>
                        <label id="state_label">
                            State
                            <input type="text" className='state' required value={state} onChange={(e) => setState(e.target.value)}></input>
                        </label>
                    </div>
                </div>

                <div id='describe-new-spot'>
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea required minLength='30' value={description} placeholder="Plese write at least 30 characters" onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div id="new-spot-title">
                    <h3>Create a title for your spot</h3>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input type='text' required maxLength='50' value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>

                <div id='new-spot-price'>
                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.<br></br>
                        $ <input type="text" required value={(+price).toFixed(2)} onChange={(e) => setPrice(e.target.value)}></input> </p>
                </div>
                <button type="submit" id='update_spot_button'>Update Your Spot</button>

            </form>
        </>
    );
}

export default UpdateSpotForm;