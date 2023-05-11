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
        if (image1.url) validImages.push(image1);
        if (image2.url) validImages.push(image2);
        if (image3.url) validImages.push(image3);
        if (image4.url) validImages.push(image4);

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
        <div id="create-spot-page">
            <h1>Create a new Spot</h1>
            {errors.message && (<p className="errors">{errors.message}</p>)}
            <form onSubmit={handleSubmit}>
                <div id='new-spot-location'>
                    <h2>Where's your place located?</h2>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                    <label>
                        Country
                        <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)}></input>
                    </label>
                    {errors.country && (<p className="errors">{errors.country}</p>)}
                    <label>
                        Street Address
                        <input type='text' required value={address} onChange={(e) => setAddress(e.target.value)}></input>
                    </label>
                    {errors.address && (<p className="errors">{errors.address}</p>)}
                    <label>
                        City
                        <input type='text' required value={city} onChange={(e) => setCity(e.target.value)}></input>,
                    </label>
                    {errors.city && (<p className="errors">{errors.city}</p>)}
                    <label>
                        State
                        <input type="text" required value={state} onChange={(e) => setState(e.target.value)}></input>
                    </label>
                    {errors.state && (<p className="errors">{errors.state}</p>)}
                </div>

                <div id='describe-new-spot'>
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea required minLength='30' placeholder="Plese write at least 30 characters" onChange={(e) => setDescription(e.target.value)}></textarea>
                    {errors.description && (<p className="errors">{errors.description}</p>)}
                </div>

                <div id="new-spot-title">
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input type='text' required maxLength='50' value={name} onChange={(e) => setName(e.target.value)}></input>
                    {errors.name && (<p className="errors">{errors.name}</p>)}
                </div>

                <div id='new-spot-price'>
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.<br></br>
                        $ <input type="text" required value={price} onChange={(e) => setPrice(e.target.value)}></input> </p>
                    {errors.price && (<p className="errors">{errors.price}</p>)}
                </div>

                <div id='new-spot-photos'>
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input type="url" placeholder="Preview Image Url" onChange={(e) => {
                        setErrors((prev) => {
                            const newErr = { ...prev };
                            delete errors.previewImage;
                            return newErr;

                        });
                        if (!validateUrls(e.target.value)) {
                            setErrors(prev => {
                                return { ...prev, previewImage: 'Image URL must end in .png, .jpg, or .jpeg' }
                            })
                        } else {
                            const obj = makeImageObj(e.target.value, true);
                            setPreviewImage(obj);
                        }
                    }} required>
                    </input>
                    {errors.previewImage && (<p className="errors">{errors.previewImage}</p>)}
                    <input type="url" placeholder="Image Url" onChange={(e) => {
                        setErrors((prev) => {
                            const newErr = { ...prev };
                            delete errors.Image1;
                            return newErr;

                        });
                        if (!validateUrls(e.target.value)) {
                            setErrors(prev => {
                                return { ...prev, Image1: 'Image URL must end in .png, .jpg, or .jpeg' }
                            })
                        } else {
                            const obj = makeImageObj(e.target.value, false);
                            setImage1(obj)
                        }
                    }}>
                    </input>
                    {errors.Image1 && (<p className="errors">{errors.Image1}</p>)}

                    <input type="url" placeholder="Image Url" onChange={(e) => {
                        setErrors((prev) => {
                            const newErr = { ...prev };
                            delete errors.Image2;
                            return newErr;

                        });
                        if (!validateUrls(e.target.value)) {
                            setErrors(prev => {
                                return { ...prev, Image2: 'Image URL must end in .png, .jpg, or .jpeg' }
                            })
                        } else {
                            const obj = makeImageObj(e.target.value, false);
                            setImage2(obj)
                        }
                    }}>
                    </input>
                    {errors.Image2 && (<p className="errors">{errors.Image2}</p>)}

                    <input type="url" placeholder="Image Url" onChange={(e) => {
                        setErrors((prev) => {
                            const newErr = { ...prev };
                            delete newErr.Image3;
                            return newErr;

                        });
                        if (!validateUrls(e.target.value)) {
                            setErrors(prev => {
                                return { ...prev, Image3: 'Image URL must end in .png, .jpg, or .jpeg' }
                            })
                        } else {
                            const obj = makeImageObj(e.target.value, false);
                            setImage3(obj)
                        }
                    }}>
                    </input>
                    {errors.Image3 && (<p className="errors">{errors.Image3}</p>)}

                    <input type="url" placeholder="Image Url" onChange={(e) => {
                        setErrors((prev) => {
                            const newErr = { ...prev };
                            delete errors.Image4;
                            return newErr;

                        });
                        if (!validateUrls(e.target.value)) {
                            setErrors(prev => {
                                return { ...prev, Image4: 'Image URL must end in .png, .jpg, or .jpeg' }
                            })
                        } else {
                            const obj = makeImageObj(e.target.value, false);
                            setImage4(obj)
                        }
                    }}>
                    </input>
                    {errors.Image4 && (<p className="errors">{errors.Image4}</p>)}

                </div>
                <button type="submit" >Create a Spot</button>
            </form>
        </div>
    );
}

export default CreateNewSpotForm;