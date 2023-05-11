import React, {useState, useEffect} from "react";
import CreateNewSpotButton from "../Navigation/CreateNewSpotButton";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentSpots } from "../../store/spots";
import SpotCard from "../LandingPage/SpotCard";

function ManageSpotsPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj);
    const update = true;

    useEffect(() => {
        dispatch(getCurrentSpots()).then(() => setIsLoaded(true));
    }, [])
    
    return (
        <div id='user-spots'>
            <h1>Manage Spots</h1>
            <CreateNewSpotButton />
            {isLoaded && (spots.map(spot => (
                <SpotCard key={spot.id} spot={spot}  update={update}/>
            )))}
        </div>
    );
}

export default ManageSpotsPage;