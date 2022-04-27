import React, {useState, useEffect} from "react";
import './Home.css';
import Event from "../../events/event/Event";
import isAdmin from "../../../utils/isAdmin";
import isLiked from "../../../utils/isLiked";
import isInterested from "../../../utils/isInterested";
import eventServices from "../../../services/event-services";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const Home = ({isLoggedIn}) => {
    const temp = parseInt(localStorage.getItem("filter"));
    const [events, setEvents] = useState([]);
    const [value, setValue] = useState(temp);

    useEffect(() => {
        if (isLoggedIn) {
            eventServices.get().then(ev => {
                setEvents(ev);
            })
        } else {
            eventServices.get(3).then(ev => {
                setEvents(ev);
            })
        }
    });

    const renderEvents = () => {
        if (isLoggedIn) {
            return events.map(event => {
                let eve = <Event
                    isAdmin={isAdmin(event)}
                    isLiked={isLiked(event)}
                    isInterested={isInterested(event)}
                    key={event._id}
                    event={event}
                    isLoggedIn={true}
                    category={value}
                    />
                if (value === -1 || value === eve.props.event.category)
                return eve;
            })
        } else {
            return events.map(event => {
                return (
                    <Event
                        isAdmin={false}
                        isLiked={false}
                        isInterested={false}
                        key={event._id}
                        event={event}
                        isLoggedIn={false}
                        category={-1}
                    />
                )
            })
        }
    }

    const handleChange = (e) => {
        setValue(e.target.value);
        localStorage.clear();
        localStorage.setItem("filter", e.target.value);
        window.location.reload(true);
    };
    

    return (
        <div className="Home">
            {isLoggedIn ? 
                <h1>
                    ALL EVENTS <br/>
                    <FormControl>
                    {/* <FormLabel id="demo-row-radio-buttons-group-label">Filter</FormLabel> */}
                    <RadioGroup row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group" 
                        value={value}
                        onChange={handleChange}
                        >

                        <FormControlLabel value="-1" control={<Radio  color="success"/>} label="All" />
                        <FormControlLabel value="0" control={<Radio color="success"/>} label="Movie" />
                        <FormControlLabel value="1" control={<Radio color="success"/>} label="Group Study" />
                        <FormControlLabel value="2" control={<Radio  color="success"/>} label="Team Sports" />
                        <FormControlLabel value="3" control={<Radio  color="success"/>} label="Other" />


                    </RadioGroup>
                    </FormControl>
                </h1> : 
                <h1>SOME OF THE LATEST EVENTS</h1> 
            }
            <div className="Events">
                { renderEvents() }
            </div>            
        </div>
    )
}

export default Home;