var {  Emp } = require('../../models');
const { ReE, ReS, to } = require('../../services/util.service');
const { Op } = require('sequelize');


const createEmp = async function (req, res) {
    
    try {
    const body = req.body;
    const tprice = parseInt(body.middle_name)*parseInt(body.price);
    // let role_id = req.user.role_id;
    const role = await Emp.findOne({ where: { first_name: body.first_name, } })
    if (role) {
        return ReE(res, { message: `${body.first_name} ki entry pehlese hai` }, 400);
    }
    await Emp.create({
        first_name: body.first_name,
        stock: parseInt(body.middle_name),
        size: parseInt(body.size),
        price: parseInt(body.price),
        tp: tprice
    })
    return ReS(res, { message: `${body.first_name} ki entry successfully ho gai` }, 200);

    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
    
};

const updateEmp = async function (req, res) {
    try {
    let body = req.body;
    let kmkname = {};
    if (body.kmk != '' && body.kmk != undefined) {
        kmkname = {
            price: body.kmk
        };
    }
    const role = await Emp.findOne({  where: { id: body.emp_id } })
    await Emp.update(
        {  first_name: body.first_name,
            stock: parseInt(body.middle_name),
            sold: parseInt(body.last_name),
            ...kmkname
        },
        {
            where: { id: body.emp_id }
        })

    return ReS(res, { message: "Role has been updated successfully." }, 200);

    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }

}

const deleteEmp = async function (req, res) {
    try {
        let body = req.body;
        let emp_id = req.params.emp_id;
        await Emp.destroy({ where: { id: emp_id } })
        return ReS(res, { message: "Emp has been deleted successfully." }, 200);
    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}

const fetchEmp = async function (req, res) {
    try {
        let emp_id = req.params.emp_id;
        const role = await Emp.findOne({ where: { id:emp_id } })
        if (!role) {
            return ReE(res, { message: "Someting went wrong" }, 400);
        }
        return ReS(res, role);
    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}


const fetchEmpsWithPeginate = async function (req, res) {
    try {
        let body = req.body;
        let mobileNumber = {};
        if (body.first_name) {
            mobileNumber = {
                first_name: body.first_name
            };
          }
          let getStock =  await Emp.findAll({
            where: {
                ...mobileNumber
              },
          
        });
        if(getStock.length === 0)
        {
            let roles = await Emp.findAndCountAll({
                offset: (( body.activePage - 1) * body.limit),
                limit: body.limit,
                subQuery: false
            });
            return ReS(res, { roles });
        } 
        else
        {
            let roles = await Emp.findAndCountAll({
                where: {
                    ...mobileNumber
                  },
                offset: (( body.activePage - 1) * body.limit),
                limit: body.limit,
                subQuery: false
            });
            return ReS(res, { roles });
        }
        // console.log(getStock,'getStock');
        // let roles = await Emp.findAndCountAll({
        //     where: {
        //         ...mobileNumber
        //       },
        //     offset: (( body.activePage - 1) * body.limit),
        //     limit: body.limit,
        //     subQuery: false
        // });
        // return ReS(res, { roles });
    } catch(error) {
        console.log(error)
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}
const sold = async function (req, res) {
   
    try {
    let body = req.body;
    const role = await Emp.findOne({ where: { id:body.emp_id } })
    const sold = await role.sold  + body.sold;
    const stock = await role.stock  - body.sold;
    const tpri1 = await body.sold  * body.soldp;
    const tpri11 = await role.tp1  + tpri1;
    await Emp.update(
        {  
            stock: parseInt(stock),
            sold: parseInt(sold),
            tp1: tpri11,
        },
        {
            where: { id: body.emp_id }
        })

    return ReS(res, { message: "Role has been updated successfully." }, 200);

    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }

}


module.exports = {
    createEmp,
    updateEmp,
    deleteEmp,
    fetchEmp,
    fetchEmpsWithPeginate,
    sold
};
