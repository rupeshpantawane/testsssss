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


import toastr from "toastr";
import "toastr/build/toastr.min.css";
import PropTypes from 'prop-types';
import { EmployeeApi } from "apis/EmployeeApi";
import { RoleModuleApi } from "../../../apis/RoleModuleApi";

import { useHistory } from "react-router-dom"
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Swal from "sweetalert2";
import { withTranslation } from "react-i18next";
import i18n from "../../../i18n";

const AddEmp = props => {
  const history = useHistory();
  const [allmodules, setAllModule] = useState([])

  useEffect(() => {
    getAllModule()
  }, [])

  const getAllModule = () => {
    RoleModuleApi.getAllModule()
      .then(res => {
        setAllModule(res.data.modules);
      }).catch(err => {
        console.log(err)
      })
  }
  // Form validation 
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      first_name: '',
      middle_name: '',

    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required(
        "This value is required"
      ),
      middle_name: Yup.string().required(
        "This value is required"
      )    
    }),
    onSubmit: (values) => {
      console.log("values", values);
      // setLoader(true)
      EmployeeApi.createEmp(values)
        .then(res => {
          // setLoader(false)
          if (res.data.success) {
            Swal.fire({
              text: "Record Saved Successfully",
              icon: 'success',
              imageAlt: 'success image',
              // confirmButtonColor: '#00CA84'
            }).then((result) => {
              if (result.isConfirmed) {
                history.push('/emp-list');
              }
            });
          } else {
            toastr.error("duplicate Entry of Full name");
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
        <Breadcrumbs title={props.t("Emp")} breadcrumbItem={props.t("Add Shoe")} />
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
                        <Label className="form-label"> Shoe Name</Label>
                        <Input
                          name="first_name"
                          placeholder="Shoe Name"
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
                        <Label className="form-label">Total Quantity</Label>
                       
                        <Input
                          name="middle_name"
                          placeholder="Total Quantity"
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
                        <Label className="form-label">Size</Label>
                       
                        <Input
                          name="size"
                          placeholder="Size"
                          type="number"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.size || ""}
                          invalid={
                            validationType.touched.size && validationType.errors.size ? true : false
                          }
                        />
                        {validationType.touched.size && validationType.errors.size ? (
                          <FormFeedback type="invalid">{validationType.errors.size}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <Label className="form-label">Price</Label>
                       
                        <Input
                          name="price"
                          placeholder="Price"
                          type="number"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.price || ""}
                          invalid={
                            validationType.touched.price && validationType.errors.price ? true : false
                          }
                        />
                        {validationType.touched.price && validationType.errors.price ? (
                          <FormFeedback type="invalid">{validationType.errors.price}</FormFeedback>
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


AddEmp.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(AddEmp);


