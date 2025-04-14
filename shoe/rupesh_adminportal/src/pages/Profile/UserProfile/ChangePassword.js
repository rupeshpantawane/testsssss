import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import PropTypes from 'prop-types';
//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";

import avatar from "../../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../../store/actions";

import {  Token,getUserID,getName, getEmail, getProfilePhoto } from "../../../Token";
import { ProfileApi } from "../../../apis/ProfileApi";
import Swal from "sweetalert2";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { withTranslation } from "react-i18next";
import i18n from "../../../i18n";

const UpdateProfile = (props) => {

   //meta title
   document.title = props.t("Profile")+' | '+props.t("MedX");

  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [profile_image, setprofileavatar] = useState("");
  const [idx, setidx] = useState(1);

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }));

  useEffect(() => {
      setname(getName());
      setemail(getEmail());
      setprofileavatar(getProfilePhoto());
      setidx(getUserID());
  });

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      old_password: '',
      password: '',
      confirm_password: ''
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required(props.t("Please Enter Old Password")),
      password: Yup.string().required(props.t("Please Enter Password")),
      confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], props.t("Passwords must match")),
    }),
    onSubmit: (values) => {
      ProfileApi.changePassword(values)
      .then(res => {
          // setLoader(false)
          if (res.data.success) {
                  Swal.fire({
                    text: res.data.message,
                    icon: 'success',
                    imageAlt: 'success image',
                    // confirmButtonColor: '#00CA84'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Token.clearStorage();
                      window.location.href = '/login';
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


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title={props.t("Profile")} breadcrumbItem={props.t("Change Password")} />

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              > 
              
              <Col sm={6}>
                <div className="form-group">
                  <Label className="form-label">Enter Old Password</Label>
                  <Input
                    name="old_password"
                    // value={name}
                    className="form-control"
                    placeholder=""
                    type="password"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.old_password || ""}
                    invalid={
                      validation.touched.old_password && validation.errors.old_password ? true : false
                    }
                  />
                  {validation.touched.old_password && validation.errors.old_password ? (
                    <FormFeedback type="invalid">{validation.errors.old_password}</FormFeedback>
                  ) : null}
                </div>
                </Col>
                <br/>

                <Col sm={6}>
                <div className="form-group">
                  <Label className="form-label">Enter Password</Label>
                  <Input
                    name="password"
                    // value={name}
                    className="form-control"
                    placeholder=""
                    type="password"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.password || ""}
                    invalid={
                      validation.touched.password && validation.errors.password ? true : false
                    }
                  />
                  {validation.touched.password && validation.errors.password ? (
                    <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                  ) : null}
                </div>
                </Col>



                <br/>

                <Col sm={6}>
                <div className="form-group">
                  <Label className="form-label">Enter Confirm Password</Label>
                  <Input
                    name="confirm_password"
                    // value={name}
                    className="form-control"
                    placeholder=""
                    type="password"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.confirm_password || ""}
                    invalid={
                      validation.touched.confirm_password && validation.errors.confirm_password ? true : false
                    }
                  />
                  {validation.touched.confirm_password && validation.errors.confirm_password ? (
                    <FormFeedback type="invalid">{validation.errors.confirm_password}</FormFeedback>
                  ) : null}
                </div>
                </Col>


                
                
                <div className="mt-4">
                  <Button type="submit" color="primary">
                    {props.t("Update Password")}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

UpdateProfile.propTypes = {
  t: PropTypes.any,
  preGlobalFilteredRows: PropTypes.any,

};
export default withTranslation()(UpdateProfile);