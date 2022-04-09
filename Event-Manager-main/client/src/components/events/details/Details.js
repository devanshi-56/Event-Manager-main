import React, {useState, useEffect} from "react";
import dateFormat from 'dateformat';
import useCollapse from 'react-collapsed';
import { Card, CardContent, CardHeader, CardMedia, ButtonGroup, CardActions } from '@material-ui/core'

import "./Details.css";
import {useParams, useHistory} from "react-router";
import isAdmin from "../../../utils/isAdmin";
import isLiked from "../../../utils/isLiked";
import isInterested from "../../../utils/isInterested";
import eventServices from "../../../services/event-services";
// import Event from "../../events/event/Event";


const Details = () => {
    const [event, setEvent] = useState({});
    const [likeStatus, setLikeStatus] = useState(false);
    const [interestStatus, setInterestStatus] = useState(false);
    const [admin, setIsAdmin] = useState(false);
    const {id} = useParams();
    const history = useHistory();
    const [ isExpanded, setExpanded ] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
    
    useEffect(() => {
        eventServices.details(id).then(res => {
            setEvent(res);
            setIsAdmin(isAdmin(res));
            setLikeStatus(isLiked(res));
            setInterestStatus(isInterested(res));
        }).catch(err => console.log(err));
    }, []);

    const handleEdit = (e) => {
        const id = e.currentTarget.id;
        history.push('/edit/' + id);
    }

    const handleDelete = (e) => {
        const id = e.currentTarget.id;
        eventServices.delete(id).then(() => {
            history.push('/');
        }).catch(err => console.log(err));
        window.location.reload(true);
        history.push('/');
    }

    const hitLike = (e) => {
        const id = e.currentTarget.id;
        eventServices.like(id).then(() => {
            setLikeStatus(true);
        }).then(()=>{
            event.likes.length+=1;
            history.push('/details/' + id);
        }).catch(err => console.log(err));
    }

    const handleParticipate = (e) => {
        const id = e.currentTarget.id;
        eventServices.participate(id).then(() => {
            alert("Participated");
            setInterestStatus(true);
            history.push('/details/' + id);
        }).catch(err => console.log(err));
    }

    const handleUnParticipate = (e) => {
        const id = e.currentTarget.id;
        eventServices.unParticipate(id).then(() => {
            alert("Participation withdrawn !");
            setInterestStatus(false);
            history.push('/details/' + id);
        }).catch(err => console.log(err));
    }

    const hitDislike = (e) => {
        const id = e.currentTarget.id;
        eventServices.dislike(id).then(() => {
            setLikeStatus(false);
        }).then(() => {
            event.likes.length-=1;
            history.push('/details/' + id);
        }).catch(err => console.log(err));
    }

    const handleOnClick = () => {
        setExpanded(!isExpanded);
    }

    const getParticipantName = (participantID)=> {
        // const user = JSON.parse
    }

    const renderInterestedParticipants = () => {
        return event.interestedParticipants.map(participate => (
            <li>{participate}</li>
        ))
    }


    const render = () => {
        return (
            <div className="card">
                    <Card varient='outlined' style={{width: 400, height: 'auto', margin: 'auto', marginTop: 50, marginBottom: 50}}>
                        <CardHeader
                            title={event.name}
                            subheader={dateFormat(event.date, "mmmm dd, yyyy")}
                        />
                        <img src={event.imageURL} alt="alt" id={event._id} className='Image' />
                        <CardContent>
                            <div align="center">
                                {event.description}
                            </div>
                        </CardContent>
                        <CardContent>
                            <div align="left">
                                <span class='row'>
                                    <i class="material-icons md-36 icon">room</i>
                                    <span class="row-item">
                                        <span>  {event.location}</span>
                                    </span>
                                </span>
                            </div>
                            <div align="left">
                                <span class="row">
                                    <i class="material-icons md-36 icon">person</i>
                                    <span class="row-item">
                                        <span>  {event.admin.firstName + ' ' + event.admin.lastName}</span>
                                    </span>
                                </span>
                            </div>
                            <div align="left">
                                <span class="row">
                                    <i class="material-icons">groups</i>
                                    <span class="row-item">
                                        <span>  No. of Participants required: {event.participants}</span>
                                    </span>
                                </span>
                            </div>
                
                        </CardContent>
                        <CardActions>
                            {admin ?
                                <div>
                                <ButtonGroup variant="text" aria-label="text button group">
                                    <button variant="outlined" id={event._id} onClick={handleEdit}>Edit</button>
                                    <button variant="outlined" id={event._id} onClick={handleDelete}>Delete</button>
                                </ButtonGroup>
                                </div>:
                                <div className="likes" align='center'>
                                    {likeStatus ?
                                        <i className="far fa-thumbs-up" id={event._id} onClick={hitDislike}></i> :
                                        <i className="far fa-thumbs-down" id={event._id} onClick={hitLike}></i>
                                    }
                                    <span> {event.likes.length + (event.likes.length === 1 ? " Like" : " Likes")}</span>
                                </div>
                            }
                        </CardActions>
                        <CardContent>
                            {admin ?
                            <div>
                                <div className="header" {...getToggleProps({onClick: handleOnClick})}>
                                    {isExpanded ? <i className="fas fa-angle-up">  view less</i> : <i className="fas fa-angle-down">  view more</i>}
                                </div>
                                <div {...getCollapseProps()}>
                                    <div className="content">
                                        {/* Now you can see the hidden content. <br/><br/>
                                        Click again to hide... */}
                                        <ul>{renderInterestedParticipants()}</ul>
                                        {/* {event.interestedParticipants.firstName} */}
                                    </div>
                                </div> 
                            </div>:
                            <div className="buttons">
                                {!interestStatus ?
                                    <button className="links" id={event._id} onClick={handleParticipate}>Participate</button>:
                                    <button className="links" id={event._id} onClick={handleUnParticipate}>Withdraw</button>
                                }   
                            </div>
                            }
                        </CardContent>
                    </Card>
                </div>
            // <div className="Details">
            //     {/* <img src={event.imageURL} alt="alt" id={event._id}/>
            //     <div className="question-answers">
            //         <span className="question">What is the name of the event?</span>
            //         <p className="name">{event.name}</p>
            //         <span className="question">Where will the event be held?</span>
            //         <p className="location">{event.location}</p>
            //         <span className="question">When will the event be held?</span>
            //         <p className="date">{dateFormat(event.date, "mmmm dS, yyyy")}</p>
            //         <span className="question">How many number of participants required?</span>
            //         <p className="participants">{event.participants}</p>
            //         <span className="question">What is the event about?</span>
            //         <p className="description">{event.description}</p>
            //     </div> */}
                
            //     {/* <div className="buttons">
            //         {!admin ?
            //             <div className="likes">
            //                 {likeStatus ?
            //                     <i className="far fa-thumbs-up blue" id={event._id} onClick={hitDislike}></i> :
            //                     <i className="far fa-thumbs-up" id={event._id} onClick={hitLike}></i>
            //                 }
            //             </div>:
            //             <div className="buttons">
            //                 <button className="links" id={event._id} onClick={handleEdit}>Edit</button>
            //                 <button className="links" id={event._id} onClick={handleDelete}>Delete</button>
            //             </div>}
            //         {admin ?
            //             <div>
            //                 <div className="header" {...getToggleProps({onClick: handleOnClick})}>
            //                     {isExpanded ? <i className="fas fa-angle-up">  view less</i> : <i className="fas fa-angle-down">  view more</i>}
            //                 </div>
            //                 <div {...getCollapseProps()}>
            //                     <div className="content">
            //                         Now you can see the hidden content. <br/><br/>
            //                         Click again to hide...
            //                     </div>
            //                 </div> 
            //             </div>:
            //             <div className="buttons">
            //                 {!interestStatus ?
            //                     <button className="links" id={event._id} onClick={handleParticipate}>Participate</button>:
            //                     <button className="links" id={event._id} onClick={handleUnParticipate}>Withdraw</button>
            //                 }   
            //             </div>
            //         }
            //     </div> */}
            // </div>
        )
    }

    return Object.keys(event).length  ? render() : <span>Loading...</span>
}

export default Details;