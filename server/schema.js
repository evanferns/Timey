const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = new Schema({value: {type: String}, completed: {type: Boolean}, _id: false});

const AccountsSchema = new Schema ( {

    userid: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: {
        type: [TasksSchema]
    }

}, {timestamps: true});

const Account = mongoose.model('Accounts', AccountsSchema);

module.exports = Account;