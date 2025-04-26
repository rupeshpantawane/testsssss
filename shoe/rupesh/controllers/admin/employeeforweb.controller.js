var { Emp } = require('../../models');
const { ReE, ReS, to } = require('../../services/util.service');
const { Op } = require('sequelize');


const fetchEmployeeWithPeginate = async function (req, res) {
    try {

        let getStock = await Emp.findAll({

        });
        return ReE(res, { data: getStock }, 200);

    } catch (error) {
        console.log(error)
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}
const createEmployee = async function (req, res) {

    try {
        const body = req.body;
        await Emp.create({
            first_name: body.first_name,
            stock: parseInt(body.middle_name),
            size: parseInt(body.size),
            price: parseInt(body.price),
            tp: body.tp,
        })
        return ReS(res, { message: `${body.first_name} ki entry successfully ho gai` }, 200);

    } catch (error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }

};
const fetchEmployee = async function (req, res) {

    try {
        let emp_id = req.params.employee_id;
        const role = await Emp.findOne({ where: { id: emp_id } })
        if (!role) {
            return ReE(res, { message: "Someting went wrong" }, 400);
        }
        return ReS(res, role);
    } catch (error) {
        console.log(error)
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}

const updateEmployee = async function (req, res) {
    try {
        let body = req.body;

        await Emp.update(
            {
                first_name: body.first_name,
                stock: parseInt(body.middle_name),
                size: parseInt(body.size),
                price: parseInt(body.price),
                tp: body.tp,
            },
            {
                where: { id: body.employee_id }
            })

        return ReS(res, { message: "Record  has been updated successfully." }, 200);

    } catch (error) {
        console.log(error)
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }

}

const deleteEmployee = async function (req, res) {
    try {
        let emp_id = req.params.employee_id;
        await Emp.destroy({ where: { id: emp_id } })
        return ReS(res, { message: "Employee has been deleted successfully." }, 200);
    } catch (error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}


module.exports = {
    fetchEmployeeWithPeginate,
    createEmployee,
    fetchEmployee,
    updateEmployee,
    deleteEmployee,
};
