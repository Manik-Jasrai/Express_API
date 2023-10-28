const express = require('express');
const router = express.Router();
const data = {};

//we import the functions that are necessary in our API
const employeeConroller = require('../../controllers/employeesControllers');
data.employee = require('../../model/employee.json');
const roleList = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(employeeConroller.getAllEmployees)
    .post(verifyRoles(roleList.admin, roleList.editor), employeeConroller.createEmployee)
    .put(verifyRoles(roleList.admin, roleList.editor), employeeConroller.updateEmployee)
    .delete(verifyRoles(roleList.admin), employeeConroller.deleteEmployee);

router.get('/:id',employeeConroller.getEmployee)

module.exports = router;