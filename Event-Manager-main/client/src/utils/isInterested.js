const isInterested = (event) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user._id;

    return event.interestedParticipants.includes(userId);
}

export default isInterested;