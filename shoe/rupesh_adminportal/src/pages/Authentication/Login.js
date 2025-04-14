import PropTypes from "prop-types";
import React from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link, useHistory } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Social Media Imports
// import TwitterLogin from "react-twitter-auth"

// actions

// import images
import profile from "assets/images/profile-img.png";
import logo from "assets/images/logo.png";

//Import config
import { facebook, google } from "../../config/config";
import { Token } from "../../Token";
import { AuthAPI } from "../../apis/AuthAPI";

import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Swal from "sweetalert2";
import { withTranslation } from "react-i18next";


const Login = props => {

   //meta title
  document.title="Login | Rj";
  const history = useHistory();
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "admin@rupesh.com",
      password: "12345678",
    },
    validationSchema: Yup.object({
      email: Yup.string().required(props.t("Please Enter Your Email")),
      password: Yup.string().required(props.t("Please Enter Your Password")),
    }),
    onSubmit: (values) => {
      //dispatch(loginUser(values, props.history));
      loginUser(values);
    }
  });

  const loginUser = (value) => {
    // setLoader(true)
    AuthAPI.login(value)
      .then(res => {
        // setLoader(false)
        Token.saveToken(res.data.user, res.data.token, res.data.settings);
        if (res.data.success) {
          localStorage.setItem("I18N_LANGUAGE", res.data.user.language);
          Swal.fire({
            text: `Welcome back ${res.data.user.first_name}`,
            icon: 'success',
            imageAlt: 'success image',
            // confirmButtonColor: '#00CA84'
          }).then((result) => {
            if (result.isConfirmed) {
              //history.push("/dashboard");
              window.location.href = '/emp-list';
            }
          });

          // toastr.success(`Welcome back ${res.data.user.name}`, '');
          // history.push("/");
         // window.location.href = '/dashboard';
        } else {
          Swal.fire({
            text: error.message,
            icon: 'error',
            imageAlt: 'error image',
            // confirmButtonColor: '#00CA84'
          });
        }
      }).catch(function (error) {
        Swal.fire({
          text: error.response.data.message,
          icon: 'error',
          imageAlt: 'error image',
          // confirmButtonColor: '#00CA84'
        });
      });
  }

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }));

localStorage.setItem("localip", window.location.hostname);

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">{props.t("Welcome Back !")}</h5>
                        <p>{props.t("Sign in to continue to Rj")}</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-white">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            width="60%"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder={props.t("Enter email")}
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder={props.t("Enter Password")}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>


                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          {props.t("Log In")}
                        </button>
                      </div>

                    </Form>
                  </div>
                </CardBody>
              </Card>
              
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Login.propTypes = {
  t: PropTypes.any,
  history: PropTypes.object,
};

export default withTranslation()(Login);