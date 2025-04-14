// src/components/filter.
import React, { useMemo, useEffect,useState } from "react";
import PropTypes from 'prop-types';

//import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import DataTable from 'react-data-table-component';
import { RoleApi } from "../../../apis/RoleApi";
import { useHistory } from "react-router-dom"
import { withTranslation } from "react-i18next";
import i18n from "../../../i18n";
import config from "../../../config/config";


import { Link } from "react-router-dom";
import {
    Button,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    ButtonDropdown,
  } from "reactstrap";

import Swal from "sweetalert2";


function Roles(props) {
    const history = useHistory();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeData, setActiveData] = useState({
        activePage: 1,
        totalPage: 1,
        search: "",
        limit: config.LIMIT,
    });

    useEffect(() => {
        getAllRoles(activeData);
    }, []);
    
    const columns = [
        {
          name: props.t("Role ID"),
          selector: row => row.role_id,
          sort: "asc",
          width: 150,
          sortable: true,
          defaultSortField: true,
          defaultSortAsc: false
        },
        {
            name:props.t("Role"),
            selector: row => row.role,
            sort: "asc",
            width: 270,
            sortable: true,
            defaultSortField: true,
            defaultSortAsc: false
        },
        {
          name:props.t("Action"),
          selector: row => row.action,
          sort: "asc",
          width: 200,
        }
      ];


    
    const getAllRoles = (data) => {
        setLoading(true);
        RoleApi.getAllRoles(data)
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
                role: v.role,
                action: (
                  <>
                    <Link
                      style={{ marginRight: "15px" }}
                      to={`/edit-role/${v.id}`}
                    >
                      <i className=" fas fa-edit" id="edittooltip" />
                    </Link>
                    <i className="mdi mdi-delete font-size-18" style={{ color: "red" }} id="deletetooltip" onClick={() => onDelete(v.id)} />
                    <Link to={`/permission/${btoa(v.id)}`} className="btn btn-primary w-xs btn-right">{props.t("permission")}</Link>
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
          text:"You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#f46a6a",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            RoleApi.deleteRole(id)
              .then((res) => {
                Swal.fire("Deleted!", res.data.message, "success");
                getAllRoles(activeData);
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
    getAllRoles(data)
    }


    const handleRowChange = (v) => {
    setActiveData({ activePage: activeData.activePage, totalPage: activeData.totalPage, search: activeData.search, limit: v });
    const data = { activePage: activeData.activePage, totalPage: activeData.totalPage, search: activeData.search, limit: v }
    getAllRoles(data)
    }


    //meta title
    document.title = props.t("Roles")+' | '+props.t("MedX");

    return (
        <div className="page-content">
            <div className="container-fluid">
            <Breadcrumbs title={props.t("Profile")} breadcrumbItem={props.t("Roles")} />
            <Link to="/add-role" className="btn btn-primary w-xs btn-right">{props.t("Add")}</Link>
            </div>

            

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
Roles.propTypes = {
    t: PropTypes.any,
    preGlobalFilteredRows: PropTypes.any,

};
export default withTranslation()(Roles);