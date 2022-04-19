const { User, Thought } = require('../models');

module.exports = {
    // /api/users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : User.deleteMany({ _id: req.params.userId })
            )
            .then(() => res.json({ message: 'Users deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // /api/users/:userId/friends/:friendId
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.body.friendId } },
            { runValidators: true, new: true }
        )
            .then((friend) =>
                !friend
                    ? res.status(404).json({ message: 'No user with this ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : User.deleteMany({ _id: req.params.userId })
        )
        .then(() => res.json({ message: 'Friend deleted!' }))
        .catch((err) => res.status(500).json(err));
    }
};