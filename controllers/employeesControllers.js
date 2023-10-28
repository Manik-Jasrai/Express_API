const Employee = require('../model/Employee');

//CRUD using mongoose
//This is a controller file.
//It contains functions that are required by our api to function
const getAllEmployees = (req,res)=>{
    
};
//Create
const createEmployee = async (req,res)=>{
    // let lastID =data.employee[data.employee.length-1];
    // data.employee.push({
    //     "id": lastID.id + 1 ,
    //     "firstname":req.body.firstname,
    //     "lastname":req.body.lastname
    // })
    // data.employee.sort((a,b)=>a.id > b.id ? 1 : (a.id < b.id ? -1 : 0));
    // res.json(data.employee);
    const fn = req.body.firstname;
    const ln = req.body.lastname;
    if (!fn || !ln) return res.status(404).json(`Firstname and Lastname both required`);
    await Employee.create({
        "firstname" :fn,
        "lastname" : ln
    })
};

const updateEmployee = (req,res)=>{
    
};

const deleteEmployee = (req,res)=>{
    const toDelete = parseInt(req.body.id);
    const employee = data.employee.findIndex(emp => emp.id === toDelete);
    data.employee.splice(employee,1);
    
};

const getEmployee = (req,res)=>{
    res.json({
        "id":req.params.id
    })
};

module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}