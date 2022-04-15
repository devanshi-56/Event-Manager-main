import React from "react";

import '../../../shared/styles.css';
import userService from "../../../services/user-services";

class Pedit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            rePassword: ''
        }
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRePassword = this.onChangeRePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

        onChangeFirstName(e) {
            this.setState({firstName: e.target.value});
            
        }
    
        onChangeLastName(e) {
            this.setState({lastName: e.target.value});
        }
    
        onChangeUsername(e) {
            this.setState({username: e.target.value});
        }
    
        onChangePassword(e) {
            this.setState({password: e.target.value});
        }
    
        onChangeRePassword(e) {
            this.setState({rePassword: e.target.value});
        }
        handleSubmit(e) {
            e.preventDefault();
            this.props.history.push('/');
            /*const id = this.props.match.params.id.toString();
            

            const {firstName, lastName, username, password} = this.state;
            userService.edit(id, {firstName, lastName, username, password})
            .then(() => {
                
                this.props.history.push('/');
                console.log(this.state);
            })
            .catch(err => console.log(err));*/
            
        }
    

    

    
   

    componentDidMount() {
        const id = this.props.match.params.id.toString();
        userService.get(id).then(user => {
            
            
                if (user._id === id) {
                    this.setState({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        password: user.password,
                        
                    });
                }
            
        }).catch(err => console.log(err));
    }

    render() {
        
        return (
            <form className="Edit" onSubmit={this.handleSubmit}>
                <p className="title">Edit your profile</p>
                <div className="input">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={this.onChangeFirstName}
                        value={this.state.firstName}
                    />
                </div>
                <div className="input">
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={this.onChangeLastName}
                        value={this.state.lastName}
                    />
                </div>
                <div className="input">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      onChange={this.onChangeUsername}
                        value={this.state.username}
                    />
                </div>
                <div className="input">
                    <input
                       type="password"
                       name="password"
                       placeholder="Password"
                       onChange={this.onChangePassword}
                        
                    />
                </div>
                <div className="input">
                <input
                    type="password"
                    name="rePassword"
                    placeholder="Repeat Password"
                    onChange={this.onChangeRePassword}
                    
                />
            </div>
                
                <button type="submit" className="btn">Edit</button>
            </form>
        )
    }
}

export default Pedit;