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

import { SimpleCrudApi } from "../../../apis/SimpleCrudApi";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2";

import { withTranslation } from "react-i18next";


const EditSimpleCrud = (props) => {

  const history = useHistory();
  const simple_crud_id = props.match.params.simple_crud_id;
  const [SimpleCrud, setSimpleCrud] = useState('');
  useEffect(() => {
    fetchSimpleCrud()
  }, []);

  const fetchSimpleCrud = () => {
    SimpleCrudApi.fetchSimpleCrud(simple_crud_id)
      .then(res => {
        setSimpleCrud(res.data)
      }).catch(err => {
        console.log(err)
      })
  }

  // Form validation 
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      first_name: SimpleCrud.first_name,
      last_name: SimpleCrud.last_name,
    },
    validationSchema: Yup.object().shape({
     first_name: Yup.string().required(
        "This value is required"
      ),
      last_name: Yup.string().required(
        "This value is required"
      )
    }),
    onSubmit: (values) => {
      values.simple_crud_id = simple_crud_id;
      SimpleCrudApi.updateSimpleCrud(values)
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
                history.push('/simple-cruds');
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

  document.title = props.t("Simple Crud") + ' | ' + props.t("Rj");

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title={props.t("Simple Crud")} breadcrumbItem={props.t("Edit Simple Crud")} />
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
                        <Label className="form-label">First name</Label>
                        <Input
                          name="first_name"
                          placeholder="First name"
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
                        <Label className="form-label">Last Name</Label>
                        <Input
                          name="last_name"
                          placeholder="Last name"
                          type="text"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.last_name || ""}
                          invalid={
                            validationType.touched.last_name && validationType.errors.last_name ? true : false
                          }
                        />
                        {validationType.touched.last_name && validationType.errors.last_name ? (
                          <FormFeedback type="invalid">{validationType.errors.last_name}</FormFeedback>
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

EditSimpleCrud.propTypes = {
  t: PropTypes.any,
  preGlobalFilteredRows: PropTypes.any,
};

export default withTranslation()(EditSimpleCrud);
