import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import SpotCard from './SpotCard'
import './LandingPage.css';

function LandingPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj);


    useEffect(() => {
        dispatch(getAllSpots()).then(() => setIsLoaded(true));
    }, [dispatch])
    
    return (
        <div id="all-spots">
            {isLoaded && (spots.map(spot => (
                <SpotCard key={spot.id} spot={spot} />
            )))}
        </div>
    );
}

export default LandingPage;