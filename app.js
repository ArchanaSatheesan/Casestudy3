// Task1: initiate app and run server at 3000
var express=require("express");
var Bodyparser=require("body-parser");
var Cors=require("cors");
var Mongoose=require("mongoose");

var {EmployeeModel}=require("./model/employee");
var app=new express();
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}));



const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
Mongoose.connect("mongodb+srv://archanasatheesan:archanasatheesan@cluster0.zb7ujpa.mongodb.net/Employeedb?retryWrites=true&w=majority",{useNewUrlParser:true});

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',(req,res)=>{
EmployeeModel.find(
    (err,data)=>{
        if(err){
            res.json({"Status":"Error","Error":err})
        }
        else{
            res.json(data);
            console.log(data);
        }
    })

});



//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id',(req,res)=>{
    let id=req.params.id;
    let name=req.body.name;
    EmployeeModel.find(data,
        (err, data)=> {
        if (err) {
            res.json({ "Status": "Error", "Error": err });
        }
        else {
            res.json(data);
            console.log(data);
        }
    }
    )
    });
    




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',(req,res)=>{
    var data={
        name:req.body.name,
        location:req.body.location,
        position:req.body.position,
        salary:req.body.salary

    }
    var employee=new EmployeeModel(data);
    employee.save((err,data)=>{
            if(err){
                res.json({"Status":"Error","Error":err})
            }
            else{
                res.json(data);
                console.log(data);

            }
        }
    )
  
});




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',(req,res)=>{

    var id=req.params.id;
    
    var data=req.body;
    EmployeeModel.findByIdAndDelete(
       {"_id":id},data,(err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
             res.json({"Status":"Deleted successfully","Data":data})   
            }
        }
    )
});



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist/',(req,res)=>{
    var name=req.body.name;
    var data={
        name:req.body.name,
        location:req.body.location,
        position:req.body.position,
        salary:req.body.salary

    }
    EmployeeModel.findOneAndUpdate(
       { "name":name},data,(err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
             res.json({"Status":"Updated","Data":data})   
            }
        }
    )
});


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000,()=>{
 console.log("server is running in port 3000")
});

