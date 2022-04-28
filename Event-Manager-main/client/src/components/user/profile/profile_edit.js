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
            email: '',
            // rePassword: ''
        }
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangeRePassword = this.onChangeRePassword.bind(this);
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
    
        onChangeEmail(e) {
            this.setState({email: e.target.value});
        }
    
        // onChangeRePassword(e) {
        //     this.setState({rePassword: e.target.value});
        // }

        validEmail(email) {
            return String(email)
                .toLowerCase()
                .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };

        handleSubmit(e) {
            e.preventDefault();
            // this.props.history.push('/');
            const id = this.props.match.params.id.toString();
            
            const {firstName, lastName, username, email} = this.state;

            if(!this.validEmail(email)){
                alert("Please enter a valid email address !");
                window.location.reload(true);
                return;
            }    

            userService.edit(id, {firstName, lastName, username, email})
            .then(() => {
                
                this.props.history.push('/profile');
                // console.log(this.state);
            })
            .catch(err => console.log(err));
            
        }

    componentDidMount() {
        const id = this.props.match.params.id.toString();
        userService.get(id).then(user => {
                if (user._id === id) {
                    this.setState({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email
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
                       type="email"
                       name="email"
                       placeholder="email"
                       onChange={this.onChangeEmail}
                       value={this.state.email}
                    />
                </div>
                {/* <div className="input">
                <input
                    type="password"
                    name="rePassword"
                    placeholder="Repeat Password"
                    onChange={this.onChangeRePassword}
                    
                />
            </div> */}
                
                <button type="submit" className="btn">Edit</button>
            </form>
        )
    }
}

export default Pedit;