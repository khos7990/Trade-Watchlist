const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');






const watchListSchema = new Schema({
    Name: String,
    pairs: Array,
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})


module.exports = mongoose.model('Watchlist', watchListSchema);