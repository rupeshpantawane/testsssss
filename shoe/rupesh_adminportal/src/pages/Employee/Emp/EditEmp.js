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


const EditEmp = (props) => {

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
      last_name: empData?.sold,
    },
    validationSchema: Yup.object().shape({
    
    }),
    onSubmit: (values) => {
      console.log("values", values);
      // setLoader(true)
      values.emp_id = emp_id;
      console.log(values)
      return
      EmployeeApi.updateEmp(values)
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

  document.title = props.t("Roles") + ' | ' + props.t("MedX");

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title={props.t("Roles")} breadcrumbItem={props.t("Edit Roles")} />
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
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validationType.handleSubmit();
                      return false;
                    }}>
                    <Col sm={6}>
                      <div className="mb-3">
                        <Label className="form-label">Shoe Name</Label>
                        <Input
                          name="first_name"
                          placeholder="shoe"
                          type="text"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.first_name || ""}
                          invalid={
                            validationType.touched.first_name && validationType.errors.first_name ? true : false
                          }
                        />
                        {validationType.touched.first_name && validationType.errors.first_name ? (
                          <FormFeedback type="invalid">{validationType.errors.first_name}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <Label className="form-label">kitne kharide</Label>
                        <Input
                          name="middle_name"
                          placeholder="Role"
                          type="number"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.middle_name || ""}
                          invalid={
                            validationType.touched.middle_name && validationType.errors.middle_name ? true : false
                          }
                        />
                        {validationType.touched.middle_name && validationType.errors.middle_name ? (
                          <FormFeedback type="invalid">{validationType.errors.middle_name}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <Label className="form-label">kitne mai kharide</Label>
                        <Input
                          name="kmk"
                          placeholder="kitne mai kharide"
                          type="number"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.kmk || ""}
                          invalid={
                            validationType.touched.kmk && validationType.errors.kmk ? true : false
                          }
                        />
                        {validationType.touched.kmk && validationType.errors.kmk ? (
                          <FormFeedback type="invalid">{validationType.errors.kmk}</FormFeedback>
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

EditEmp.propTypes = {
  t: PropTypes.any,
  preGlobalFilteredRows: PropTypes.any,
};

export default withTranslation()(EditEmp);
