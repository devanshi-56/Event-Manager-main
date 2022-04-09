require('dotenv').config();
const models = require('../models');
const Users = require('../models/User.js')

module.exports = {
    get: {
        all: (req, res, next) => {
            const limit = Number(req.query.limit);

            if (limit) {
                models.Event.find().sort('name').limit(limit).populate('admin')
                    .exec(function (err, events) {
                        res.send(events);
                    })
            } else {
                models.Event.find().populate('admin')
                    .then((events) => res.send(events))
                    .catch(next);
            }
        },
        details: (req, res, next) => {
            const id = req.params.id;

            models.Event.findById(id).populate('admin')
                .then(async ev =>  {
                    let arr = [];
                    let docs = await Users.find({}).lean();
                    arr = docs.filter((doc) => doc !== null);
                    for(let i = 0; i < ev.interestedParticipants.length; i++){
                        var userId = ev.interestedParticipants[i];
                        for(let j = 0; j < arr.length; j++){
                            if(JSON.stringify(arr[j]._id).localeCompare(JSON.stringify(userId)) === 0){
                                // ev.interestedParticipants[i] = arr[j].firstName + " " + arr[j].lastName;
                                ev.interestedParticipants[i] = {
                                    objId: ev.interestedParticipants[i],
                                    name: arr[j].firstName + " " + arr[j].lastName
                                }
                                // console.log(ev.interestedParticipants[i])
                            }
                        }
                    }
                    res.send(ev)
                })
                .catch(next);
        }
    },

    post: {
        create: (req, res, next) => {
            const {description, location, name, date, participants, imageURL ,expire_at } = req.body;
            const {_id} = req.user;
            console.log(expire_at);
            models.Event.create({description, location, name, date, participants, imageURL, admin: _id,expire_at })
                .then((createdEvent) => {
                    return Promise.all([
                        models.User.updateOne({_id}, {$push: {createdEvents: createdEvent}}),
                        models.Event.findOne({_id: createdEvent._id})
                    ]);
                })
                .then(([userObj, eventObj]) => res.send(eventObj))
                .catch(next);
        }
    },

    put: {
        edit: (req, res, next) => {
            const id = req.params.id;
            const {name, description, imageURL, date, participants, location} = req.body;
            models.Event.findByIdAndUpdate(id, {name, description, imageURL, date, participants, location})
                .then((updatedEvent) => res.send(updatedEvent))
                .catch(next)
        },
        
        like: (req, res, next) => {
            const id = req.params.id;
            const {_id} = req.user;

            models.Event.findByIdAndUpdate(id, {$push: {likes: _id}})
                .then(updatedEvent => {
                    return Promise.all([
                        models.User.findByIdAndUpdate(_id, {$push: {likedEvents: id}}),
                        models.Event.findOne({_id: updatedEvent._id})
                    ]);
                })
                .then(([userObj, eventObj]) => res.send(eventObj))
                .catch(next);
        },
        participate: (req, res, next) => {
            const id = req.params.id;
            const {_id} = req.user;

            models.Event.findByIdAndUpdate(id, {$push: {interestedParticipants: _id}})
                .then(updatedEvent => {
                    return Promise.all([
                        models.User.findByIdAndUpdate(_id, {$push: {interestedEvents: id}}),
                        models.Event.findOne({_id: updatedEvent._id})
                    ]);
                })
                .then(([userObj, eventObj]) => res.send(eventObj))
                .catch(next);
        },
        dislike: (req, res, next) => {
            const id = req.params.id;
            const {_id} = req.user;

            models.Event.findByIdAndUpdate(id, {$pull: {likes: _id}})
                .then(updatedEvent => {
                    return Promise.all([
                        models.User.findByIdAndUpdate(_id, {$pull: {likedEvents: id}}),
                        models.Event.findOne({_id: updatedEvent._id})
                    ]);
                })
                .then(([userObj, eventObj]) => res.send(eventObj))
                .catch(next);
        },
        
        unParticipate: (req, res, next) => {
            const id = req.params.id;
            const {_id} = req.user;

            models.Event.findByIdAndUpdate(id, {$pull: {interestedParticipants: _id}})
                .then(updatedEvent => {
                    return Promise.all([
                        models.User.findByIdAndUpdate(_id, {$pull: {interestedEvents: id}}),
                        models.Event.findOne({_id: updatedEvent._id})
                    ]);
                })
                .then(([userObj, eventObj]) => res.send(eventObj))
                .catch(next);
        }
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        const {_id} = req.user;

        models.Event.deleteOne({ _id: id })
            .then((deletedEvent) => {
                return Promise.all([
                    models.User.updateOne({_id}, {$pull: {createdEvents: id}}),
                    models.Event.findOne({_id: deletedEvent._id})
                ]);
            })
            .then(([obj, deletedEvent]) => res.send(deletedEvent))
            .catch(next)
    }
};