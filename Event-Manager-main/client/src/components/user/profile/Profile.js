import React, {useEffect, useState} from "react";
import {useHistory } from "react-router-dom";
import './Profile.css';
import userImg from '../../../images/user2.jpg';
import userService from "../../../services/user-services";
import Event from "../../events/event/Event";

const Profile = () => {
    const [display, setDisplay] = useState('createdEvents');
    const [user, setUser] = useState({});
    const [likedEvents, setLikedEvents] = useState([]);
    const [interestedEvents, setInterestedEvents] = useState([]);
    const [createdEvents, setCreatedEvents] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const userId = JSON.parse(sessionStorage.getItem('user'))._id;
        userService.get(userId).then(res => {
            setUser(res);
            setLikedEvents(res['likedEvents']);
            setInterestedEvents(res['interestedEvents']);
            setCreatedEvents(res['createdEvents']);
            
        }).catch(err => console.log(err));
    }, []);

    const likedEventsClick = (e) => {
        setDisplay('likedEvents');
    }

    const createdEventsClick = (e) => {
        setDisplay('createdEvents');
    }
    const interestedEventsClick = (e) => {
        setDisplay('interestedEvents');
    }
    const editProfileClick =(e)=> {
        
        const userId = JSON.parse(sessionStorage.getItem('user'))._id;
        //const id = e.currentTarget.id;
        history.push('user/edit/' + userId);
        console.log("Hello");
    }

    const renderLikedEvents = () => {
        return likedEvents.map(event => {

            return (
                <Event
                    isAdmin={false}
                    isLiked={true}
                    
                    key={event._id}
                    event={event}
                    // display="profile"
                />
            )
        })
    }
    const renderInterestedEvents = () => {
        return interestedEvents.map(event => {

            return (
                <Event
                    isAdmin={false}
                    isInterested={true}
                    key={event._id}
                    event={event}
                    // display="profile"
                />
            )
        })
    }

    const renderCreatedEvents = () => {
        return createdEvents.map(event => {
            return (
                <Event
                    isAdmin={true}
                    isLiked={false}
                    key={event._id}
                    event={event}
                />
            )
        })
    }

    const render = () => {
        return (
            <div className="Profile">
                {display === 'likedEvents' ?
                    <div>
                        <h1>Liked Events</h1>
                        {likedEvents.length !== 0 ? renderLikedEvents() : <span>No liked events</span>}
                    </div> :
                    <div>
                    {display === 'interestedEvents' ?
                        <span>
                        <h1>Interested Events</h1>
                        {interestedEvents.length !== 0 ? renderInterestedEvents() : <span>No interested events</span>}
                        </span>:
                        <span>
                            <h1>Created Events</h1>
                            {createdEvents.length !== 0 ? renderCreatedEvents() : <span>No created events</span>}
                        </span>
                    }</div>  
                }
               
                <div className="profile-data">
                    <div classname="profile-edit">
                        <img src={userImg} alt="alt"/>
                        <i class="fas fa-edit" onClick={editProfileClick}></i>
                    </div>
                    <p className="name">{user.firstName.toUpperCase() + ' ' + user.lastName.toUpperCase()}</p>
                    <p className="username">{ '@' + user.username}</p>
                    <p className="email">{user.email}</p>
                    <p className="liked-events">Liked events: {user.likedEvents.length}</p>
                    <p className="created-events">Created events: {user.createdEvents.length}</p>
                    <p className="interested-events">Interested events: {user.interestedEvents.length}</p>
                    <div className="buttons">
                        <button onClick={likedEventsClick}>Liked events</button>
                        <button onClick={interestedEventsClick}>Interested events</button>
                        <button onClick={createdEventsClick}>Created events</button>
                        {/* <button className="links" id={user._id}onClick={editProfileClick}>Edit Profile</button> */}
                    </div>
                </div>
            </div>
        )
    }

    return Object.keys(user).length ? render() : <span>Loading...</span>

}

export default Profile;