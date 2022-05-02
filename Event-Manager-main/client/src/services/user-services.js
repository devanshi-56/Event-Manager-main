const userService = {
    
    get: function(id) {
        return fetch(`http://localhost:4000/user/` + id, {
           method: 'GET',
           credentials: 'include'
        }).then(res => res.json());
        
    },
    register: function(data) {
       
        return fetch(`http://localhost:4000/user/register`, {
            method: 'POST',
            
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        }).then(
            res => res.json()
        ).then(user => {
            sessionStorage.setItem('user', JSON.stringify(user))
        });
    },
    edit: function (id, data) {
         return fetch(`http://localhost:4000/user/user/edit/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json());
        
    },
    login: function(data) {
        return fetch(`http://localhost:4000/user/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        }).then(res => {
            return res.json();
        }).then((response) => {
            let temp = response;
            if(temp["code"] === -1){
                alert("Wrong password");
                window.location.reload(true);
            }
            else
                return response;

        }).then(user => {
            sessionStorage.setItem('user', JSON.stringify(user));
        });
    },
    logout: function() {
        return fetch(`http://localhost:4000/user/logout`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.text()).then(() => sessionStorage.clear());
    }
}

export default userService;