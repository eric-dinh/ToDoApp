// get mongoose model created
var ToDo = require('../models/todo.model');

// save context of this module inside the _this variable
_this = this;

// async function to get todo list
exports.getTodos = async function (query, page, limit) {
    // options setup for mongoose paginate
    var options = {
        page,
        limit,
    };

    try {
        var todos = await ToDo.paginate(query, options);

        // return the todo list returned by mongoose promise
        return todos;
    }
    catch (e) {
        // return descriptive error message
        throw Error("Error while paginating todo list")
    }
}

// async function to create todo object
exports.createTodo = async function (todo) {
    // create new mongoose object using new keyword
    var newTodo = new ToDo({
        title: todo.title,
        description: todo.description,
        date: new Date(),
        status: todo.status,
    });

    try {
        // save todo
        var savedTodo = await newTodo.save();

        // return created todo
        return savedTodo;
    }
    catch (e) {
        // return descriptive error message
        throw Error("Error while creating todo");
    }
}

// async function to update todo object
exports.updateTodo = async function (todo) {
    var id = todo.id;

    try {
        // find old todo object by id
        var oldTodo = await ToDo.findById(id);
    }
    catch (e) {
        // return descriptive error message
        throw Error("Error while finding todo");
    }

    if (!oldTodo) {
        return false;
    }

    console.log(oldTodo);

    // edit Todo object
    oldTodo.title = todo.title;
    oldTodo.description = todo.description;
    oldTodo.status = todo.status;

    console.log(oldTodo);

    try {
        // update todo
        var savedTodo = await oldTodo.save();

        // return updated todo
        return savedTodo;
    }
    catch (e) {
        // return descriptive error message
        throw Error("Error while updating todo");
    }
}

// async function to delete todo object
exports.deleteTodo = async function (id) {
    try {
        // delete todo
        var deleted = await ToDo.remove({ _id: id });
        if (deleted.result.n === 0) {
            throw Error("Could not delete todo")
        }

        // return deleted todo
        return deleted;
    }
    catch (e) {
        // return descriptive error message
        throw Error("Error while deleting todo");
    }
}