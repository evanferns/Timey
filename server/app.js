const express = require('express');
const mongoose = require('mongoose');
const Account = require('./schema');

const app = express();

// Connect to MongoDB
const dbURL = 'mongodb+srv://admin:uwaterloo12345@study-app.h5pdl.mongodb.net/study-db?retryWrites=true&w=majority';

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// Middleware
app.use(express.urlencoded({extended : true}));

// Add a custom-made document to database [for testing]
app.post('/add-custom-account', async (req, res) => {
    const account = new Account({
        userid: 'test id',
        first_name: 'test name 1',
        last_name: 'test name 2',
        password: 'test password',
        tasks: [{value: 'test task 1', completed: true}, {value: 'test task 2', completed: false}],
    });

    await account.save()
        .catch((err) => {
            err.statusCode = 400; // adding custom document to database was unsuccessful
            throw(err);
        });
});

// Retrieve all documents
app.get('/all-accounts', async (req, res) => {
    await Account.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            err.statusCode = 400; // retrieving all documents was unsuccessful
            throw(err);
        });
});

// Retrieve a single document by userid
// STRUCTURE OF OBJECT REQ:
// {
//      userid - String
// }
app.get('/single-account', async (req, res) => {
    await Account.findOne({userid: req.body.userid})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            err.statusCode = 400; // searching for document and retrieving it was unsuccessful
            throw(err);
        });
});

// returns true if userid already exists in the database. Else, returns false
function isDuplicate(accounts, myuserid) {
    for (let i = 0; i < accounts.length; i++) {
        if (myuserid == accounts[i].userid) {
            return true;
        }
    }
    return false;
}

// Add a document to database
// STRUCTURE OF OBJECT REQ:
// {
//      userid - String
//      first_name - String
//      last_name - String
//      password - String
//      tasks - [{value - String, false}]
// }
app.post('/add-account', async (req, res) => {
    try {
        const accounts = await Account.find();
        if (isDuplicate(accounts, req.body.userid) == false) { // no duplicate userids allowed in database
            const account = new Account(req.body);
            await account.save();
        }
    } catch (err) {
        err.statusCode = 400; // adding document to database was unsuccessful
        throw(err);
    }
});

// Delete a document from database
// STRUCTURE OF OBJECT REQ:
// {
//      userid - String
// }
app.delete('/delete-account', async (req, res) => {
    await Account.deleteOne({userid: req.body.userid})
        .catch((err) => {
            err.statusCode = 400; // deleting document from database was unsuccessful
            throw(err);
        });
});

// Remove all tasks from the to-do list
// STRUCTURE OF OBJECT REQ:
// {
//      userid - String
// }
app.patch('/delete-tasks', async (req, res) => {
    try {
        const account = await Account.findOne({userid: req.body.userid});
        while (account.tasks.length != 0) {
            account.tasks.splice(0, 1);
        }
        await account.save();
    } catch (err) {
        err.statusCode = 400; // deleting all tasks from the document in database was unsuccessful
        throw(err);
    }
});

// Remove a single task from the to-do list
// STRUCTURE OF OBJECT REQ:
// {
//      userid - String
//      taskvalue - String
// }
app.patch('/delete-task', async (req, res) => {
    try {
        const account = await Account.findOne({userid: req.body.userid});
        for (let i = 0; i < account.tasks.length; i++) {
            if ((account.tasks[i]).value == req.body.taskvalue) {
                account.tasks.splice(i, 1);
                break;
            }
        }
        await account.save();
    } catch (err) {
        err.statusCode = 400; // deleting a single task from the document in database was unsuccessful
        throw(err);
    }
});

// Mark a task as complete/incomplete
// STRUCTURE OF OBJECT REQ:
// {
//      userid - String
//      taskvalue - String
//      completed - Boolean
// }
app.patch('/task-checker', async (req, res) => {
    try {
        const account = await Account.findOne({userid: req.body.userid});
        for (let i = 0; i < account.tasks.length; i++) {
            if ((account.tasks[i]).value == req.body.taskvalue) {
                (account.tasks[i]).completed = req.body.completed;
                break;
            }
        }
        await account.save();
    } catch (err) {
        err.statusCode = 400; // deleting a single task from the document in database was unsuccessful
        throw(err);
    }
});

// Add a task to user's to-do list
// STRUCTURE OF OBJECT REQ:
// {
//      userid - String
//      taskvalue - String
// }
app.patch('/add-task', async (req, res) => {
    try {
        const account = await Account.findOne({userid: req.body.userid});
        account.tasks.push({value: req.body.taskvalue, completed: false});
        await account.save();
    } catch (err) {
        err.statusCode = 400; // adding a single task to the document in database was unsuccessful
        throw(err);
    }
});

// Retrieve all tasks of an account from database
// STRUCTURE OF OBJECT REQ:
// {
//      userid - String
// }
app.get('/all-tasks', async (req, res) => {
    try {
        const account = await Account.findOne({userid: req.body.userid});
        res.send(account.tasks);
    } catch (err) {
        err.statusCode = 400; // retrieving all tasks of a document from database was unsuccessful
        throw(err);
    }
});