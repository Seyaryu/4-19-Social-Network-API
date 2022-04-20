const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughts => res.json(thoughts))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    },
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
            .then(thought => res.json(thought))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id}) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'No user found with this username!'});
                    return;
                }
                res.json(thought);
            })
            .catch(err => res.json(err));
    },
    addReaction (req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
        .then(thought => {
            if (!thought) {
                res.status(404).json({ message: 'No thought with this ID!' });
                return;
            }
            res.json(thought)
        })
        .catch(err => res.json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
        .then(thought => res.json(thought))
        .catch(err => res.json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id }, 
            req.body,
            { new: true, runValidators: true }
        )
        .then(thought => {
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID!' });
            }
        res.json(thought);
        })
        .catch(err => res.json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
        .then(thought => {
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID!'})
            }
            res.json(thought);
        })
        .catch(err => res.json(err));
    }
}