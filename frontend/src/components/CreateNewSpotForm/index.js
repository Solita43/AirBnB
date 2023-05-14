import React, { useState } from "react";
import * as spotActions from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './CreateNewSpotForm.css'

function CreateNewSpotForm() {
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState({});
    const [image1, setImage1] = useState({});
    const [image2, setImage2] = useState({});
    const [image3, setImage3] = useState({});
    const [image4, setImage4] = useState({});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();



    const validateUrls = (url) => {
        const validEndings = ['.png', '.jpg', '.jpeg'];
        for (let end of validEndings) {
            if (url.endsWith(end)) return true
        }
        return false;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errors.previewImg || errors.Image1 || errors.Image2 || errors.Image3 || errors.Image4) return;

        const validImages = [];
        validImages.push(previewImage);
        validImages.push(image1);
        validImages.push(image2);
        validImages.push(image3);
        validImages.push(image4);

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


        await dispatch(spotActions.createSpot(spot, validImages)).then((id) => history.push(`/spotDetails/${id}`)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });


    }



    const makeImageObj = (url, preview) => {
        return { url, preview }
    }

    return (
        <>
            <form id='create-spot-form' onSubmit={handleSubmit}>
                <h1 id='create_spot_title'>Create a new Spot</h1>
                {errors.message && (<p className="errors">{errors.message}</p>)}
                <div id='new-spot-location'>
                    <h3>Where's your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                    <label>
                        Country
                        <input type="text" required placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value.trim())}></input>
                    </label>
                    {errors.country && (<p className="errors">{errors.country}</p>)}
                    <label>
                        Street Address
                        <input type='text' required placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value.trim())}></input>
                    </label>
                    {errors.address && (<p className="errors">{errors.address}</p>)}
                    <div id='city_state'>
                        <label>
                            City
                            <input id='city' type='text' placeholder="City" required value={city} onChange={(e) => setCity(e.target.value.trim())}></input>
                        </label>
                        {errors.city && (<p className="errors">{errors.city}</p>)}
                        <label id="state_label">
                            State
                            <input className='state' placeholder="State" type="text" required value={state} onChange={(e) => setState(e.target.value.trim())}></input>
                        </label>
                        {errors.state && (<p className="errors">{errors.state}</p>)}
                    </div>
                </div>

                <div id='describe-new-spot'>
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea required minLength='30' placeholder="Please write at least 30 characters..." onChange={(e) => setDescription(e.target.value.trim())}></textarea>
                    {errors.description && (<p className="errors">{errors.description}</p>)}
                </div>

                <div id="new-spot-title">
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input type='text' required placeholder='Name your spot...' maxLength='50' value={name} onChange={(e) => setName(e.target.value.trim())}></input>
                    {errors.name && (<p className="errors">{errors.name}</p>)}
                </div>

                <div id='new-spot-price'>
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1em' }}>$ <input id='form_price' placeholder='Price per night (USD)' type="text" required value={price} onChange={(e) => setPrice(e.target.value.trim())}></input> </p>
                    {errors.price && (<p className="errors">{errors.price}</p>)}
                </div>

                <div id='new-spot-photos'>
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to five photos to publish your spot.</p>
                    <input type="url" placeholder="Preview Image Url" onChange={(e) => {
                        setErrors((prev) => {
                            const newErr = { ...prev };
                            delete newErr.previewImage;
                            return newErr;

                        });
                        if (!validateUrls(e.target.value.trim())) {
                            setErrors(prev => {
                                return { ...prev, previewImage: 'Image URL must end in .png, .jpg, or .jpeg' }
                            })
                        } else {
                            const obj = makeImageObj(e.target.value.trim(), true);
                            setPreviewImage(obj);
                        }
                    }} required>
                    </input>
                    {errors.previewImage && (<p className="errors">{errors.previewImage}</p>)}
                    <input type="url" placeholder="Image Url" onChange={(e) => {
                        setErrors((prev) => {
                            const newErr = { ...prev };
                            delete newErr.Image1;
                            return newErr;

                        });
                        if (!validateUrls(e.target.value.trim())) {
                            setErrors(prev => {
                                return { ...prev, Image1: 'Image URL must end in .png, .jpg, or .jpeg' }
                            })
                        } else {
                            const obj = makeImageObj(e.target.value.trim(), false);
                            setImage1(obj)
                        }
                    }} required>
                    </input>
                    {errors.Image1 && (<p className="errors">{errors.Image1}</p>)}

                    <input type="url" placeholder="Image Url" onChange={(e) => {
                        setErrors((prev) => {
                            const newErr = { ...prev };
                            delete newErr.Image2;
                            return newErr;

                        });
                        if (!validateUrls(e.target.value.trim())) {
                            setErrors(prev => {
                                return { ...prev, Image2: 'Image URL must end in .png, .jpg, or .jpeg' }
                            })
                        } else {
                            const obj = makeImageObj(e.target.value.trim(), false);
                            setImage2(obj)
                        }
                    }} required>
                    </input>
                    {errors.Image2 && (<p className="errors">{errors.Image2}</p>)}

                    <input type="url" placeholder="Image Url" onChange={(e) => {
                        setErrors((prev) => {
                            const newErr = { ...prev };
                            delete newErr.Image3;
                            return newErr;

                        });
                        if (!validateUrls(e.target.value.trim())) {
                            setErrors(prev => {
                                return { ...prev, Image3: 'Image URL must end in .png, .jpg, or .jpeg' }
                            })
                        } else {
                            const obj = makeImageObj(e.target.value.trim(), false);
                            setImage3(obj)
                        }
                    }} required>
                    </input>
                    {errors.Image3 && (<p className="errors">{errors.Image3}</p>)}

                    <input type="url" placeholder="Image Url" onChange={(e) => {
                        setErrors((prev) => {
                            const newErr = { ...prev };
                            delete errors.Image4;
                            return newErr;

                        });
                        if (!validateUrls(e.target.value.trim())) {
                            setErrors(prev => {
                                return { ...prev, Image4: 'Image URL must end in .png, .jpg, or .jpeg' }
                            })
                        } else {
                            const obj = makeImageObj(e.target.value.trim(), false);
                            setImage4(obj)
                        }
                    }} required>
                    </input>
                    {errors.Image4 && (<p className="errors">{errors.Image4}</p>)}

                </div>
                <button type="submit" id='submit_spot'>Create Spot</button>
            </form>
        </>
    );
}

export default CreateNewSpotForm;