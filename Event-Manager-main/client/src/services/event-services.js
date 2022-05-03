const eventServices = {
    get: async function(limit) {
        const promise = await fetch(`https://find-squad-back.herokuapp.com/event?limit=${limit}`);
        const events = await promise.json();

        return events;
    },
    
    create: function(data) {
        return fetch('https://find-squad-back.herokuapp.com/event/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json());
    },
    edit: function (id, data) {
        
        console.log(data);
        return fetch('https://find-squad-back.herokuapp.com/event/edit/' + id, {    
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json());
    },
    delete: function (id) {
        return fetch('https://find-squad-back.herokuapp.com/event/delete/' + id, {
            method: 'DELETE',
            credentials: 'include'
        }).then(res => res.json());
    },
    like: function (id) {
        return fetch('https://find-squad-back.herokuapp.com/event/like/' + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json());
    },
    participate: function (id) {
        return fetch('https://find-squad-back.herokuapp.com/event/participate/' + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json());
    },
    dislike: function (id) {
        return fetch('https://find-squad-back.herokuapp.com/event/dislike/' + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json());
    },
    unParticipate: function (id) {
        return fetch('https://find-squad-back.herokuapp.com/event/unParticipate/' + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json());
    },
    details: async function (id) {
        const promise = await fetch(`https://find-squad-back.herokuapp.com/event/details/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        });
        const event = await promise.json();

        return event;
    }
}

export default eventServices;