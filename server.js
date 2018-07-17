// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static( __dirname + '/public/dist/public' ));
// Setting our Views Folder Directory
//DATABASE/MONGOOSE
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/intro');

// Use native promises
mongoose.Promise = global.Promise;

//make schema
var TaskSchema = new mongoose.Schema({
    title:{type:String, default: ""},
    description: {type:String, default: ""},
    completed: {type:Boolean, default: false}
},{timestamps:true});

mongoose.model('Task',TaskSchema);

var Task = mongoose.model('Task');

// Routes
// Root Request
// app.get('/', (req, res) => {
//     //res.redirect('/tasks');
// })

app.get('/tasks',(req,res) => {
    Task.find({},function(err,tasks){
        if(err){
            console.log("Returned error", err);
             // respond with JSON
            res.json({message: "Error", error: err})
         }
         else {
             // respond with JSON
            res.json({message: "Success", data: tasks})
         }
        });
    });
app.get('/tasks/:taskId', (req,res) => {
    console.log(req.params.taskId);
    Task.findOne({_id:req.params.taskId},function(err,task){
        if(err){
            console.log("Returned error", err);
             // respond with JSON
            res.json({message: "Error", error: err})
         }
         else {
             // respond with JSON
            res.json({message: "Success", data: task})
         }
    });
});

app.post('/tasks',(req,res) => {
    console.log(req.body.title,req.body.description);
    var task = new Task({title:req.body.title, description:req.body.description})
    task.save(function(saveError){
        if(saveError){
            console.log("could not save, ",saveError);
            res.redirect('/');
        }
        else{
            console.log("saved task to DB; ",task);
            res.json(task);
        }
    });
});

app.put('/tasks/:taskId',(req,res) => {
    Task.findOneAndUpdate({_id:req.params.taskId},req.body,function(err,task){
        if(err){
            console.log("could not find task, ",err);
            res.redirect("/");
        }
        if(task == null){
            console.log("could not find a task with that ID");
            res.redirect("/");
        }
        else{
            console.log("found this task: ",task);
            console.log("editing....");
            res.redirect('/');
        }
    });
});

app.delete('/tasks/:taskId',(req,res) => {
    Task.findByIdAndRemove(req.params.taskId,function(err,task){
        if(err){
            console.log("could not find and remove task",err);
            res.redirect('/');
        }
        else{
            console.log("removed task: ",task);
            res.json(task);
        }
    });
});

// Setting our Server to Listen on Port: 8000
app.listen(8500, function() {
    console.log("listening on port 8500");
})
