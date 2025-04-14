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

import {  getUserID,getName, getEmail, getProfilePhoto } from "../../../Token";
import { ProfileApi } from "../../../apis/ProfileApi";
import Swal from "sweetalert2";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { withTranslation } from "react-i18next";
import i18n from "../../../i18n";


const UpdateProfile = (props) => {

   //meta title
   document.title= props.t("Profile")+' | '+props.t("MedX");


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
      name: name || ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required(props.t("Please Enter Your Name")),
    }),
    onSubmit: (values) => {
      ProfileApi.updateProfile(values)
      .then(res => {
          // setLoader(false)
          if (res.data.success) {
            setname(values.name);
                  Swal.fire({
                    text: res.data.message,
                    icon: 'success',
                    imageAlt: 'success image',
                    // confirmButtonColor: '#00CA84'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      history.push('/update-profile');
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
          <Breadcrumb title={props.t("MedX")} breadcrumbItem={props.t("Profile")} />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={profile_image}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{email}</p>
                        <p className="mb-0">Id no: #{idx}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>


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
                  <Label className="form-label">{props.t("Name")}</Label>
                  <Input
                    name="name"
                    // value={name}
                    className="form-control"
                    placeholder={props.t("Enter Name")}
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
                    invalid={
                      validation.touched.name && validation.errors.name ? true : false
                    }
                  />
                  {validation.touched.name && validation.errors.name ? (
                    <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                  ) : null}
                </div>
                </Col>
                <div className="mt-4">
                  <Button type="submit" color="primary">
                    {props.t("Update Profile")}
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