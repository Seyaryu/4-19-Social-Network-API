const router = require('express').Router();

// Users
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
  } = require('../../controllers/userController.js');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/api/users/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

// Thoughts
const {
    getThoughts,
    getThoughtById,
    createThought,
    addReaction,
    deleteReaction,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController.js')

router.route('/api/thoughts')
    .get(getThoughts)
    .post(createThought);

router.route('/api/thoughts/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route('/api/thoughts/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction);

module.exports = router;