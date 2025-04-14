import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
 
  Button,

  Label,
  Input,
  Container,
  FormFeedback,
  Form,
} from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import PropTypes from 'prop-types';

import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { EmployeeApi } from "apis/EmployeeApi";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2";

import { withTranslation } from "react-i18next";
import i18n from "../../../i18n";
import moment from "moment"


const Sold = (props) => {

  const history = useHistory();
  const emp_id = props.match.params.emp_list_id;
  const [firstName, setFirstName] = useState('');
  const [empData, setEmpData] = useState('');
  useEffect(() => {
    getRoleById()
  }, []);

  const getRoleById = () => {
    EmployeeApi.getEmpById(emp_id)
      .then(res => {
        //console.log('rolessss',res.data.role);
        setEmpData(res.data)
      }).catch(err => {
        console.log(err)
      })
  }

  // Form validation 
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      first_name: empData?.first_name,
      middle_name: empData?.stock,
      sold: "",
      last_name: empData?.sold,
    },
    validationSchema: Yup.object().shape({
    
    }),
    onSubmit: (values) => {
      // setLoader(true)
      values.emp_id = emp_id;
      EmployeeApi.sold(values)
        .then(res => {
          // setLoader(false)
          if (res.data.success) {
            Swal.fire({
              text: "Record Updated Successfully",
              icon: 'success',
              imageAlt: 'success image',
              // confirmButtonColor: '#00CA84'
            }).then((result) => {
              if (result.isConfirmed) {
                history.push('/emp-list');
              }
            });
          } else {
            toastr.error(res.message, '');
          }
        }).catch(function (error) {
          toastr.error(error.response.data.message, '');
        });
    }
  });

  document.title = props.t("Sold") + ' | ' + props.t("Rj");

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title={props.t("Roles")} breadcrumbItem={props.t("Sold")} />
        <Container fluid={true}>
          <Row>
            <Col className="col-12">

              <Button style={{ float: "right", marginBottom: "20px", }}
                color="primary"
                className="waves-effect waves-light  pull-right"
                onClick={() => history.goBack()}
              >
                Back
              </Button>

            </Col>
            <Col lg={12}>
              <Card>
                <CardBody >
              <Label className="form-label"> Name:{validationType.values.first_name}</Label> <br></br>
              <Label className="form-label"> Stock:{validationType.values.middle_name}</Label> <br></br>
              <Label className="form-label"> Sold:{validationType.values.last_name}</Label> 

                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validationType.handleSubmit();
                      return false;
                    }}>
                   
                    <Col sm={6}>
                      <div className="mb-3">
                        <Label className="form-label">kitna becha</Label>
                        <Input
                          name="sold"
                          placeholder="kitna becha"
                          type="number"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.sold || ""}
                          invalid={
                            validationType.touched.sold && validationType.errors.sold ? true : false
                          }
                        />
                        {validationType.touched.sold && validationType.errors.sold ? (
                          <FormFeedback type="invalid">{validationType.errors.sold}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <Label className="form-label">kitna price mai becha</Label>
                        <Input
                          name="soldp"
                          placeholder="kitna price mai becha"
                          type="number"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.soldp || ""}
                          invalid={
                            validationType.touched.soldp && validationType.errors.soldp ? true : false
                          }
                        />
                        {validationType.touched.soldp && validationType.errors.soldp ? (
                          <FormFeedback type="invalid">{validationType.errors.soldp}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <div className="d-flex flex-wrap gap-2">
                      <Button type="submit" color="primary" >
                        {props.t("Submit")}
                      </Button>{" "}
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Sold.propTypes = {
  t: PropTypes.any,
  preGlobalFilteredRows: PropTypes.any,
};

export default withTranslation()(Sold);
