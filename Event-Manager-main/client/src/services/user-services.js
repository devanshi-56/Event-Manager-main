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
        console.log(data);
         return fetch(`http://localhost:4000/user/edit/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                firstName: this.state.firstName,
            lastName: this.props.lastName,
            username: this.props.username,
            password: this.props.password

            }),
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
            // console.log(res.json().passError)
            return res.json();
        }).then((response) => {
            let temp = response;
            // console.log(JSON.stringify(response));
            // console.log(temp["code"]);
            // console.log(temp["firstName"]);
            // console.log(temp)
            // return response;
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