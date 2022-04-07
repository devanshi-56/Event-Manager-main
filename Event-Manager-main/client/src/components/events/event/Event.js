import React, {useState, useEffect} from "react";
import {useHistory } from "react-router-dom";
import dateFormat from 'dateformat';

import "./Event.css";
import eventServices from "../../../services/event-services";
import isLoggedIn from "../../../utils/auth";
// Add reminder state here
const Event = ({event, isAdmin, isLiked, isLoggedIn}) => {
    const [likeState, setLikeState] = useState(isLiked);
    const history = useHistory();

    const handleEdit = (e) => {
        const id = e.currentTarget.id;
        history.push('/edit/' + id);
    }

    const handleDelete = (e) => {
        const id = e.currentTarget.id;
        eventServices.delete(id).then(() => {
            history.push('/');
        }).catch(err => console.log(err));
    }

    const hitLike = (e) => {
        const id = e.currentTarget.id;
        eventServices.like(id).then(() => {
            history.push('/');
            setLikeState(true);
        }).catch(err => console.log(err));
    }

    const hitDislike = (e) => {
        const id = e.currentTarget.id;
        eventServices.dislike(id).then(() => {
            history.push('/');
            setLikeState(false);
        }).catch(err => console.log(err));
    }

    const showDetails = (e) => {
        const id = e.currentTarget.id;
        eventServices.details(id).then(() => {
            history.push('/details/' + id);
        }).catch(err => console.log(err));
    }

    return (
        <div className="Event" key={event._id}>
            {
                isLoggedIn ?
                    <img src={event.imageURL} alt="alt" className="details" onClick={showDetails} id={event._id}/> :
                    <img src={event.imageURL} alt="alt" id={event._id}/>
            }
            <p class="meetup">{event.name}</p>
            {/* <h3 class="group">{event.admin.firstName + ' ' + event.admin.lastName}</h3> */}
            {/* <p className="name"><strong>{event.name}</strong></p> */}
            {/* <p className="description">{event.description}</p> */}
            <p className="details"><span class="row">
            <i class="material-icons md-36 icon">event</i>
            <span class="row-item">
            <time>{dateFormat(event.date, "mmmm dS, yyyy")}</time>
            </span>
            </span>
           
            <span class="row">
            <i class="material-icons md-36 icon">room</i>
            <span class="row-item">
            <span>{event.location}</span>
            
            </span>
            </span>

            { event.admin.firstName ?
            <span class="row">
            <i class="material-icons md-36 icon">person</i>
            <span class="row-item">
            <span>{event.admin.firstName + ' ' + event.admin.lastName}</span>
            {/* event.admin.firstName ?
            <span>{event.admin.firstName + ' ' + event.admin.lastName}
                    
                   
                </span> : null */}
            </span>
            </span>: <span class="row">
            <i></i>
            <span class="row-item">
            <span></span>
            
            </span></span>
            }
            
            </p>

            { event.admin.firstName ?
                <div className="creator">
                    
                   
                </div> : null
            }
                {!isAdmin ?
                    <div>
                        {event.admin.firstName ?
                <div className="likes">
                {likeState ?
                    <i className="far fa-thumbs-up blue" id={event._id} onClick={hitDislike}></i> :
                    <i className="far fa-thumbs-up" id={event._id} onClick={hitLike}></i>
                }
                <span> {event.likes.length + (event.likes.length === 1 ? " Like" : " Likes")}</span>
                </div> : null }
                    </div>
                :
                <div className="buttons">
                <button className="links" id={event._id} onClick={handleEdit}>Edit</button>
                <button className="links" id={event._id} onClick={handleDelete}>Delete</button>
                </div>}
        </div>
    )
}

export default Event;