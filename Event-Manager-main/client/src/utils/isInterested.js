const isInterested = (event) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user._id;

    // return event.interestedParticipants.includes(userId);
    for(let i = 0; i < event.interestedParticipants.length; i++){
        if(JSON.stringify(event.interestedParticipants[i].objId) === JSON.stringify(userId))
            return true;
    }
    return false;
}

export default isInterested;