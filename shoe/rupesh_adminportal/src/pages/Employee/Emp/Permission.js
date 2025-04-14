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
import PropTypes, { element } from 'prop-types';


import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { RoleApi } from "../../../apis/RoleApi";
import { RoleModuleApi } from "../../../apis/RoleModuleApi";


//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";
import i18n from "../../../i18n";
import _ from "lodash";
import { RolePermissionAPI } from "apis/RolePermissionAPI";
import { useHistory } from "react-router-dom";

const FormValidations = (props) => {
    const role_id = atob(props.match.params.role_id);
    const [role, setRole] = useState('');
    const [allmodules, setAllModule] = useState([]);
    const [accessModules, setAccessModules] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getRoleById();
        getAllModule()
    }, []);

    const getRoleById = () => {
      RoleApi.getRoleById(role_id)
        .then(res => {
          setRole(res.data.role)
        }).catch(err => {
          console.log(err)
        })
    }
  
    const getAllModule = () => {
      const payload = {
        role_id: role_id
      }
     RoleModuleApi.getAllModulesByRoleAPI(payload)
        .then(res => {
          if(res.data.success){
            let existArr = [];
            setAllModule(res.data.modules);
            res.data.modules.forEach(async (mod, i) => {
              let childrens = [];
              mod.childrens.forEach( async (child, j) => {
                childrens[j] = {
                  id: child.id,
                  isChecked: child.isChecked,
                  view: child.isRead,
                  add: child.isCreate,
                  edit: child.isEdit,
                  delete: child.isDelete
                };
              });
              existArr[i] = {
                id: mod.id,
                isChecked: mod.isChecked,
                childrens: childrens
              };
            });
            setAccessModules(existArr);
          }else{
            setAllModule([]);
            setAccessModules([]);
          }
          
        }).catch(err => {
          console.log(err)
        })
    }

  const onSaveUpdateRolePermission = () => {
    const payload = {
      role_id: parseInt(role_id),
      permmssionArr: accessModules
    }
    RolePermissionAPI.saveUpdateRolePermissionAPI(payload)
      .then(res => {
        if(res.data.success){
          history.push('/roles');
        }
      }).catch(err => {
        console.log(err)
      });
  }


  const filterCateoryChange = async (type, parentID, action = "", parentIndex, childIndex) => {
      if(type === 'parent' && parentID === 0){
        const allModulesCopy = _.cloneDeep(allmodules);
        const editModulesData = allModulesCopy[parentIndex];
        editModulesData.childrens.forEach(async (child, i) => {
          child.isChecked = !child.isChecked;
          child.isRead = !child.isRead;
          child.isCreate = !child.isCreate;
          child.isEdit = !child.isEdit;
          child.isDelete = !child.isDelete;
        });
        editModulesData.isChecked = !editModulesData.isChecked;
        allModulesCopy.splice(parentIndex, 1, editModulesData);
        setAllModule(allModulesCopy);

        const accessModulesCopy = _.cloneDeep(accessModules);
        const editAccessModulesData = accessModulesCopy[parentIndex];
        editAccessModulesData.childrens.forEach(async (child, i) => {
          child.isChecked = !child.isChecked;
          child.view = !child.view;
          child.add = !child.add;
          child.edit = !child.edit;
          child.delete = !child.delete;
        });
        editAccessModulesData.isChecked = !editAccessModulesData.isChecked;
        console.log(editAccessModulesData);
        accessModulesCopy.splice(parentIndex, 1, editAccessModulesData);
        setAccessModules(accessModulesCopy);
        
      }else if(type === 'child' && parentID !== 0){
        const allModulesCopy = _.cloneDeep(allmodules);
        const editModulesData = allModulesCopy[parentIndex];
        let count = 0;
        editModulesData.childrens.forEach(async (child, i) => {
          if(childIndex !== i){
            if(child.isChecked){
              count = count + 1;
            }
          }
        });
        if(!count){
          editModulesData.isChecked = !editModulesData.isChecked;
        }
        editModulesData.childrens[childIndex].isChecked = !editModulesData.childrens[childIndex].isChecked;
        editModulesData.childrens[childIndex].isRead = !editModulesData.childrens[childIndex].isRead;
        editModulesData.childrens[childIndex].isCreate = !editModulesData.childrens[childIndex].isCreate;
        editModulesData.childrens[childIndex].isEdit = !editModulesData.childrens[childIndex].isEdit;
        editModulesData.childrens[childIndex].isDelete = !editModulesData.childrens[childIndex].isDelete;
        allModulesCopy.splice(parentIndex, 1, editModulesData);
        setAllModule(allModulesCopy);

        const accessModulesCopy = _.cloneDeep(accessModules);
        const editAccessModulesData = accessModulesCopy[parentIndex];
        let count2 = 0;
        editAccessModulesData.childrens.forEach(async (child, i) => {
          if(childIndex !== i){
            if(child.isChecked){
              count2 = count2 + 1;
            }
          }
        });
        if(!count2){
          editAccessModulesData.isChecked = !editAccessModulesData.isChecked;
        }
        editAccessModulesData.childrens[childIndex].isChecked = !editAccessModulesData.childrens[childIndex].isChecked;
        editAccessModulesData.childrens[childIndex].view = !editAccessModulesData.childrens[childIndex].view;
        editAccessModulesData.childrens[childIndex].add = !editAccessModulesData.childrens[childIndex].add;
        editAccessModulesData.childrens[childIndex].edit = !editAccessModulesData.childrens[childIndex].edit;
        editAccessModulesData.childrens[childIndex].delete = !editAccessModulesData.childrens[childIndex].delete;
        accessModulesCopy.splice(parentIndex, 1, editAccessModulesData);
        setAccessModules(accessModulesCopy);

      }else if(type === 'action' && parentID !== 0){
        const allModulesCopy = _.cloneDeep(allmodules);
        const editModulesData = allModulesCopy[parentIndex];
        if(!editModulesData.isChecked){
          editModulesData.isChecked = !editModulesData.isChecked;
        }
        if(!editModulesData.childrens[childIndex].isChecked){
          editModulesData.childrens[childIndex].isChecked = !editModulesData.childrens[childIndex].isChecked;
        }
        if(action === "view"){
          editModulesData.childrens[childIndex].isRead = !editModulesData.childrens[childIndex].isRead;
        }else if(action === "add"){
          editModulesData.childrens[childIndex].isCreate = !editModulesData.childrens[childIndex].isCreate;
        }else if(action === "edit"){
          editModulesData.childrens[childIndex].isEdit = !editModulesData.childrens[childIndex].isEdit;
        }else if(action === "delete"){
          editModulesData.childrens[childIndex].isDelete = !editModulesData.childrens[childIndex].isDelete;
        }
        allModulesCopy.splice(parentIndex, 1, editModulesData);
        setAllModule(allModulesCopy);

        const accessModulesCopy = _.cloneDeep(accessModules);
        const editAccessModulesData = accessModulesCopy[parentIndex];
        if(!editAccessModulesData.isChecked){
          editAccessModulesData.isChecked = !editAccessModulesData.isChecked;
        }
        if(!editAccessModulesData.childrens[childIndex].isChecked){
          editAccessModulesData.childrens[childIndex].isChecked = !editAccessModulesData.childrens[childIndex].isChecked;
        }
        if(action === "view"){
          editAccessModulesData.childrens[childIndex].view = !editAccessModulesData.childrens[childIndex].view;
        }else if(action === "add"){
          editAccessModulesData.childrens[childIndex].add = !editAccessModulesData.childrens[childIndex].add;
        }else if(action === "edit"){
          editAccessModulesData.childrens[childIndex].edit = !editAccessModulesData.childrens[childIndex].edit;
        }else if(action === "delete"){
          editAccessModulesData.childrens[childIndex].delete = !editAccessModulesData.childrens[childIndex].delete;
        }
        console.log(editAccessModulesData);
        accessModulesCopy.splice(parentIndex, 1, editAccessModulesData);
        setAccessModules(accessModulesCopy);
      }
  };
  

  return (
    <React.Fragment>
      <div className="page-content">
      <Breadcrumbs title="Forms" breadcrumbItem="Form Validation" />
        <Container fluid={true}>
       
          <Row>

            <Col lg={12}>
              <Card>
                <CardBody >
                

                  <form>
                    <Col sm={6}>
                    <div className="mb-3">
                      <Label className="form-label">Role</Label>
                      <Input
                        name="role"
                        placeholder="Role"
                        type="text"
                        readOnly
                        value={role || ""}
                      />
                    </div>
                    </Col>

                    <div className="ul-list-style">
                    <Label className="form-label">Modules</Label>
                        <ul>

                          {
                            allmodules.map((menu, i) => {
                              if (!menu.is_dropdown) {
                                return (
                                  <>
                                    <li>

                                      <span className="caret">
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name={`module_name[${i}]`}
                                            value={JSON.stringify(menu)}
                                            onMouseUp={(e) => {filterCateoryChange("parent", menu.parent_id, "", i)}}
                                            checked={menu.isChecked}
                                            id={`parent_${menu.id}`}
                                          />
                                          <label className="form-check-label" htmlFor="defaultCheck1">{menu.name}</label>
                                        </div></span>
                                    </li>
                                  </>
                                )

                              } else {

                                return (
                                  <>
                                    <li>
                                      <span className="caret">
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name={`module_name[${i}]`}
                                            value={JSON.stringify(menu)}
                                            onMouseUp={(e) => {filterCateoryChange("parent", menu.parent_id, "", i)}}
                                            checked={menu.isChecked}
                                            id={`parent_${menu.id}`}
                                          />
                                          <label className="form-check-label" htmlFor="defaultCheck1" >{menu.name}</label>
                                        </div></span>

                                     {
                                        menu.childrens.map((childmenu, j) => {
                                          return (
                                            <ul className="nested" key={j}>
                                              <li>
                                                <span className="caret">
                                                  <div className="form-check">
                                                    <input
                                                      className="form-check-input"
                                                      type="checkbox"
                                                      name={`module_name[${i}][${j}]`}
                                                      value={JSON.stringify(childmenu)}
                                                      onMouseUp={(e) => {filterCateoryChange("child", childmenu.parent_id, "", i, j)}}
                                                      checked={childmenu.isChecked}
                                                      id={`child_${menu.id}`}
                                                    />
                                                    <label className="form-check-label" htmlFor="defaultCheck1" > {childmenu.name}</label>
                                                  </div></span>
                                                <ul className="nested">


                                                  <li><div className="form-check">
                                                    <input
                                                      className="form-check-input"
                                                      type="checkbox"
                                                      name={`module_name[${i}][${j}]['view']`}
                                                      value={JSON.stringify(childmenu)}
                                                      onMouseUp={(e) => {filterCateoryChange("action", childmenu.parent_id, "view", i, j)}}
                                                      checked={childmenu.isRead}
                                                      id={`action_${menu.id}`}
                                                    />
                                                    <label className="form-check-label" htmlFor="defaultCheck1" >View</label>
                                                  </div>
                                                  </li>


                                                  {childmenu.is_readonly == 0 &&
                                                    <>
                                                      <li>
                                                        <div className="form-check">
                                                          <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name={`module_name['add'][${childmenu.id}]`}
                                                            value={JSON.stringify(childmenu)}
                                                            onMouseUp={(e) => {filterCateoryChange("action", childmenu.parent_id, "add",  i, j)}}
                                                            checked={childmenu.isCreate}
                                                            id={`action_${menu.id}`}
                                                          />
                                                          <label className="form-check-label" htmlFor="defaultCheck1" > Add</label>
                                                        </div>
                                                      </li>
                                                      <li>
                                                        <div className="form-check">
                                                          <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name={`module_name['edit'][${childmenu.id}]`}
                                                            value={JSON.stringify(childmenu)}
                                                            onMouseUp={(e) => {filterCateoryChange("action", childmenu.parent_id, "edit",  i, j)}}
                                                            checked={childmenu.isEdit}
                                                            id={`action_${menu.id}`}
                                                          />
                                                          <label className="form-check-label" htmlFor="defaultCheck1" >Edit</label>
                                                        </div>
                                                      </li>
                                                      <li>
                                                        <div className="form-check">
                                                          <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name={`module_name['delete'][${childmenu.id}]`}
                                                            value={JSON.stringify(childmenu)}
                                                            onMouseUp={(e) => {filterCateoryChange("action", childmenu.parent_id, "delete",  i, j)}}
                                                            checked={childmenu.isDelete}
                                                            id={`action_${menu.id}`}
                                                          />
                                                          <label className="form-check-label" htmlFor="defaultCheck1" > Delete</label>
                                                        </div>
                                                      </li>
                                                    </>
                                                  }
                                                </ul>
                                              </li>
                                            </ul>

                                          )

                                        })

                                      } 
                                    </li>

                                  </>
                                )

                              }
                            })
                          }


                        </ul>
                      </div>
                   
                    <div className="d-flex flex-wrap gap-2">
                      <Button type="button" color="primary" onClick={onSaveUpdateRolePermission}>
                      {props.t("Submit")}
                      </Button>{" "}
                    </div>
                  </form>
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
