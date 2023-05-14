import React, { useState, useEffect } from "react";
import CreateNewSpotButton from "./CreateNewSpotButton";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentSpots } from "../../store/spots";
import SpotCard from "../LandingPage/SpotCard";
import './ManageSpots.css'

function ManageSpotsPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj);
    const update = true;

    useEffect(() => {
        dispatch(getCurrentSpots()).then(() => setIsLoaded(true));
    }, [dispatch])

    return (
        <div id='manage-spots'>
            <div id='manage-header'>
                <h1>Manage Spots</h1>
                {!spots.length && (
                    <>
                        <CreateNewSpotButton />
                        <p id='no_spots'>You haven't created any spots yet!</p>
                    </>
                )}
            </div>
            <div id='all-spots'>
                {isLoaded && (spots.map(spot => (
                    <SpotCard key={spot.id} spot={spot} update={update} />
                )))}
            </div>
        </div>
    );
}

export default ManageSpotsPage;