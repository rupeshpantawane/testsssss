// src/components/filter.
import React, { useMemo, useEffect, useState } from "react";
import PropTypes from 'prop-types';

//import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import DataTable from 'react-data-table-component';
import { EmployeeApi } from "apis/EmployeeApi";
import { useHistory } from "react-router-dom"
import { withTranslation } from "react-i18next";
import i18n from "../../../i18n";
import config from "../../../config/config";


import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Card,
  CardBody,
  Modal

} from "reactstrap";

import Swal from "sweetalert2";


function EmpList(props) {
  const history = useHistory();
  const [roles, setRoles] = useState([]);
  const [stockData, setstockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal_standard, setmodal_standard] = useState(false);
  const [activeData, setActiveData] = useState({
    activePage: 1,
    totalPage: 1,
    search: "",
    limit: config.LIMIT,
  });

  useEffect(() => {
    getAllEmps(activeData);
  }, []);
  function tog_standard(data) {
    setstockData(data)
    setmodal_standard(!modal_standard);
  }

  const columns = [
    // {
    //   name: props.t("Emp ID"),
    //   selector: row => row.role_id,
    //   sort: "asc",
    //   width: 150,
    //   sortable: true,
    //   defaultSortField: true,
    //   defaultSortAsc: false
    // },
    {
      name: props.t("Name"),
      selector: row => row.first_name,
      sort: "asc",
      width: 270,
      sortable: true,
      defaultSortField: true,
      defaultSortAsc: false
    },
    {
      name: props.t("kitna hai"),
      selector: row => row.stock,
      sort: "asc",
      width: 270,
      sortable: true,
      defaultSortField: true,
      defaultSortAsc: false
    },
    {
      name: props.t("kitna gaya"),
      selector: row => row.sold,
      sort: "asc",
      width: 270,
      sortable: true,
      defaultSortField: true,
      defaultSortAsc: false
    },
    {
      name: props.t("Action"),
      selector: row => row.action,
      sort: "asc",
      width: 200,
    },
    {
      name: props.t("delete"),
      selector: row => row.delete,
      sort: "asc",
      width: 200,
    }
  ];
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const data = {
      activePage: 1,
      totalPage: 1,
      search: "",
      limit: config.LIMIT,
      first_name: e.target.mobile_number.value
    }
    getAllEmps(data);
  }



  const getAllEmps = (data) => {
    setLoading(true);
    EmployeeApi.getAllEmps(data)
      .then((res) => {
        setActiveData({
          activePage: activeData.activePage,
          totalPage: res.data.roles.count,
          search: activeData.search,
          limit: activeData.limit,
        });

        let data = [];
        res.data.roles.rows.forEach((v, i) => {
          data[i] = {
            role_id: v.id,
            first_name: (
              <>
              
                <button
                  type="button"
                  onClick={() => {
                    tog_standard(v);
                  }}
                  className="btn btn-link waves-effect btn btn-link"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  {v.first_name}
                </button>{" "}
              </>
            ),
            stock: v.stock,
            sold: v.sold,
            action: (
              <>
                <Link
                  style={{ marginRight: "15px" }}
                  to={`/sold/${v.id}`}
                >
                  Bechna
                </Link>
                <Link
                  style={{ marginRight: "15px" }}
                  to={`/edit-emp/${v.id}`}
                >
                  Kharidna
                </Link>
              </>
            ),
            delete: (
              <>
                <i className="mdi mdi-delete font-size-18" style={{ color: "red" }} id="deletetooltip" onClick={() => onDelete(v.id)} />
                {/* <Link to={`/permission/${btoa(v.id)}`} className="btn btn-primary w-xs btn-right">{props.t("permission")}</Link> */}
              </>
            ),
          };
        });
        setRoles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        EmployeeApi.deleteEmp(id)
          .then((res) => {
            Swal.fire("Deleted!", res.data.message, "success");
            getAllEmps(activeData);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const handleChange = (v) => {
    setActiveData({ activePage: v, totalPage: activeData.totalPage, search: activeData.search, limit: activeData.limit });
    const data = { activePage: v, totalPage: activeData.totalPage, search: activeData.search, limit: activeData.limit }
    getAllEmps(data)
  }


  const handleRowChange = (v) => {
    setActiveData({ activePage: activeData.activePage, totalPage: activeData.totalPage, search: activeData.search, limit: v });
    const data = { activePage: activeData.activePage, totalPage: activeData.totalPage, search: activeData.search, limit: v }
    getAllEmps(data)
  }


  //meta title
  document.title = props.t("Emp") + ' | ' + props.t("Assign");

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title={props.t("Profile")} breadcrumbItem={props.t("Emp")} />
      </div>
      {/* <Form onSubmit={handleFilterSubmit}> */}
      <Form onSubmit={handleFilterSubmit} >
        <Row className="mb-4">

          <Col sm={6} className="col-xl">
            <FormGroup className="mb-3">
              <Label className="form-label">Shoe Name :</Label>
              <input
                type="text"
                name="mobile_number"
                className="form-control"
                id="mobile_number"
                required
                placeholder="shoe ka naam likhiye"
              />
            </FormGroup>
          </Col>



          <Col sm={6} className="col-xl align-self-end">
            <div className="mb-3">
              <Button
                type="submit"
                color="primary"
                className="w-md"
              >
                Filter
              </Button>
            </div>
          </Col>
          <Col sm={6} className="col-xl align-self-end">
            <div className="mb-3">

              <Link to="/add-emp" className="btn btn-primary w-xs btn-right">{props.t("Add")}</Link>


            </div>
          </Col>

        </Row>
      </Form>
      <Modal
              isOpen={modal_standard}
              toggle={() => {
                tog_standard('value');
              }}
            >
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validationType.handleSubmit();
                  return false;
                }}>
                <Row>
                  <Col lg={12}>
                    <Card>
                      <CardBody>
                        <div>
                        <h5>shoe name :{stockData?.first_name}</h5>
                        <h5>kitna hai :{stockData?.stock}</h5>
                        <h5>kitna gaya:{stockData?.sold}</h5>
                        <h5>size:{stockData?.size}</h5>
                        <h5>price:{stockData?.price}</h5>
                        <h5>kharidi price:{stockData?.tp}</h5>
                        <h5>bikri price:{stockData?.tp1}</h5>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={() => {
                      tog_standard();
                    }}
                    className="btn btn-secondary "
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </Form>
            </Modal>



      <div className="container-fluid">
        <DataTable
          className="table-bordered"
          progressPending={loading}
          columns={columns}
          data={roles}
          pagination
          paginationServer
          paginationTotalRows={activeData.totalPage}
          paginationPerPage={activeData.limit}
          defaultSortFieldID={1}
          onChangeRowsPerPage={value => handleRowChange(value)}
          onChangePage={value => handleChange(value)}
          sortable
          noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          highlightOnHover
        />
      </div>
    </div>
  );
}
EmpList.propTypes = {
  t: PropTypes.any,
  preGlobalFilteredRows: PropTypes.any,

};
export default withTranslation()(EmpList);