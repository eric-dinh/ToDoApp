// access created service
var ToDoService = require('../services/todo.service');

// save context of this module inside the _this variable
_this = this;

// async controller function to get todo list
exports.getTodos = async function (req, res, next) {
    /*
    check if query paramters exist
    if not, assign default value
    */
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var todos = await ToDoService.getTodos({}, page, limit);

        return res.status(200).json({ status: 200, data: todos, message: "Successfully received todo list" });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createTodo = async function (req, res, next) {
    // req.body contains values for form submission
    var todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
    };

    try {
        // call service function with new object from request body
        var createdTodo = await ToDoService.createTodo(todo);
        return res.status(201).json({ status: 201, data: createdTodo, message: "Successfully created todo" });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateTodo = async function (req, res, next) {
    // id necessary for update
    if (!req.body._id) {
        return res.status(400).json({status: 400, message: e.message})
    }

    var id = req.body._id;

    console.log(req.body);

    var todo = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }

    try {
        var updatedTodo = await ToDoService.updateTodo(todo);
        return res.status(200).json({ status: 200, data: updatedTodo, message: "Successfully updated todo" })
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.removeTodo = async function (req, res, next) {
    var id = req.params.id;

    try {
        var deleted = await ToDoService.deleteTodo(id);
        return res.status(204).json({ status: 204, message: "Succesfully Todo Deleted" });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

}