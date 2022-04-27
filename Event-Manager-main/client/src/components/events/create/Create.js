import React, {useState, useEffect} from "react";
// import Combobox from "react-widgets/Combobox";

import '../../../shared/styles.css';
import eventServices from "../../../services/event-services";
import {useHistory} from "react-router";

const Create = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [expire_at, setExpire_at] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [location, setLocation] = useState('');
    const [participants, setParticipants] = useState('');
    const [category, setCategory] = useState(0);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
        eventServices.create({ name, description, location, date, participants, imageURL,expire_at, category })
            .then(() => history.push('/'))
            .catch(err => {
                console.log(err);
            })
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangeDate = (e) => {
        setDate(e.target.value);
        const date1 = e.target.value;
        let n = date1.length;
        // console.log(n);
        let ones = parseInt(date1[n-1]);
        let tens = parseInt(date1[n-2]);  
        let date2= ((tens*10)+ones+1);
        date2=date2.toString();
        // console.log(date2);
        let date3 =date1.substring(0,n-2) + date2;

        // console.log(date3);
        setExpire_at(date3);
        //setExpire_at(new Date(e.target.value.getTime()+ 24*60*60000));
        
    }

    const onChangeImageURL = (e) => {
        setImageURL(e.target.value);
    }

    const onChangeLocation = (e) => {
        setLocation(e.target.value);
    }
    const onChangeParticipants = (e) => {
        setParticipants(e.target.value);
    }
    const onChangeCategory = (e) =>{
        setCategory(e.target.value);
    }
    
    return (
        <form className="Create" onSubmit={handleSubmit}>
            <p className="title">Create your event</p>
            <div className="input">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={onChangeName}
                    value={name}
                />
            </div>
            <div className="input">
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    onChange={onChangeDescription}
                    value={description}
                />
            </div>
            <div className="input">
                <input
                    type="date"
                    name="date"
                    min="01/01/2021"
                    max="01/01/2030"
                    onChange={onChangeDate}
                    value={date}
                />
            </div>
            <div className="input">
                <input
                    type="number"
                    name="numberOfParticipants"
                    min="1"
                    max="500000"
                    placeholder="number of participants"
                    onChange={onChangeParticipants}
                    value={participants}
                />
            </div>
            <div className="input">
                <input
                    type="text"
                    name="imageURL"
                    placeholder="imageURL"
                    onChange={onChangeImageURL}
                    value={imageURL}
                />
            </div>
            <div className="input">
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={onChangeLocation}
                    value={location}
                />
            </div>
            <div className="input">
                <select name="category" id="category" onChange={onChangeCategory}>
                    <option value="0">Movie</option>
                    <option value="1">Group Study</option>
                    <option value="2">Team Sports</option>
                    <option value="3">Other</option>
                </select>
            </div>
            <button type="submit" className="btn">CREATE</button>
        </form>
    )
}

/*class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = { description: '', location: '', name: '', date: '', imageURL: '' }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeImageURL = this.onChangeImageURL.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeName(e) {
        this.setState({name: e.target.value});
    }

    onChangeDescription(e) {
        this.setState({description: e.target.value});
    }

    onChangeDate(e) {
        this.setState({date: e.target.value});
    }

    onChangeLocation(e) {
        this.setState({location: e.target.value});
    }

    onChangeImageURL(e) {
        this.setState({imageURL: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name, description, location, date, imageURL } = this.state;

        eventServices.create({ name, description, location, date, imageURL })
            .then(() => {
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const {description, location, name, date, imageURL} = this.state;

        return (
            <form className="Create" onSubmit={this.handleSubmit}>
                <p className="title">Create your event</p>
                <div className="input">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={this.onChangeName}
                        value={name}
                    />
                </div>
                <div className="input">
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        onChange={this.onChangeDescription}
                        value={description}
                    />
                </div>
                <div className="input">
                    <input
                        type="date"
                        name="date"
                        min="01/01/2021"
                        max="01/01/2030"
                        onChange={this.onChangeDate}
                        value={date}
                    />
                </div>
                <div className="input">
                    <input
                        type="text"
                        name="imageURL"
                        placeholder="imageURL"
                        onChange={this.onChangeImageURL}
                        value={imageURL}
                    />
                </div>
                <div className="input">
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        onChange={this.onChangeLocation}
                        value={location}
                    />
                </div>
                <button type="submit" className="btn">CREATE</button>
            </form>
        )
    }
}*/

export default Create;