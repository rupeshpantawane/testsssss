import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  CardSubtitle,
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

import { RoleApi } from "../../../apis/RoleApi";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2";

import { withTranslation } from "react-i18next";
import i18n from "../../../i18n";


const FormValidations = (props) => {

  const history = useHistory();
  const role_id = props.match.params.role_id;
  const [role, setRole] = useState('');
  useEffect(() => {
    getRoleById()
  }, []);

  const getRoleById = () => {
    RoleApi.getRoleById(role_id)
      .then(res => {
        //console.log('rolessss',res.data.role);
        setRole(res.data.role)
      }).catch(err => {
        console.log(err)
      })
  }

  // Form validation 
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      role: role
    },
    validationSchema: Yup.object().shape({
      role: Yup.string().required(
        "This value is required"
      )
    }),
    onSubmit: (values) => {
      console.log("values", values);
      // setLoader(true)
      values.role_id = role_id;
      RoleApi.updateRole(values)
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
                history.push('/roles');
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
                        <Label className="form-label">Required</Label>
                        <Input
                          name="role"
                          placeholder="Role"
                          type="text"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.role || ""}
                          invalid={
                            validationType.touched.role && validationType.errors.role ? true : false
                          }
                        />
                        {validationType.touched.role && validationType.errors.role ? (
                          <FormFeedback type="invalid">{validationType.errors.role}</FormFeedback>
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

FormValidations.propTypes = {
  t: PropTypes.any,
  preGlobalFilteredRows: PropTypes.any,
};

export default withTranslation()(FormValidations);
