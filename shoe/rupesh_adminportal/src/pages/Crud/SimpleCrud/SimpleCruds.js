// src/components/filter.
import React, { useMemo, useEffect,useState } from "react";
import PropTypes from 'prop-types';

//import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import DataTable from 'react-data-table-component';
import { SimpleCrudApi } from "../../../apis/SimpleCrudApi";
import { useHistory } from "react-router-dom"
import { withTranslation } from "react-i18next";
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


function SimpleCruds(props) {
    const history = useHistory();
    const [SimpleCruds, setSimpleCruds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeData, setActiveData] = useState({
        activePage: 1,
        totalPage: 1,
        search: "",
        limit: config.LIMIT,
    });

    useEffect(() => {
        getAllSimpleCruds(activeData);
    }, []);
    
    const columns = [
        {
          name: props.t("ID"),
          selector: row => row.simple_crud_id,
          sort: "asc",
          width: 150,
          sortable: true,
          defaultSortField: true,
          defaultSortAsc: false
        },
        {
            name:props.t("First Name"),
            selector: row => row.first_name,
            sort: "asc",
            width: 270,
            sortable: true,
            defaultSortField: true,
            defaultSortAsc: false
        },
        {
          name:props.t("Last Name"),
          selector: row => row.last_name,
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


    
    const getAllSimpleCruds = (data) => {
        setLoading(true);
        SimpleCrudApi.fetchSimpleCrudsWithPeginate(data)
          .then((res) => {
            setActiveData({
              activePage: activeData.activePage,
              totalPage: res.data.data.count,
              search: activeData.search,
              limit: activeData.limit,
            });
            let data = [];
            res.data.data.rows.forEach((v, i) => {
              data[i] = {
                simple_crud_id: v.id,
                first_name: v.first_name,
                last_name: v.last_name,
                action: (
                  <>
                    <Link
                      style={{ marginRight: "15px" }}
                      to={`/edit-simple-crud/${v.id}`}
                    >
                      <i className=" fas fa-edit" id="edittooltip" />
                    </Link>
                    <i className="mdi mdi-delete font-size-18" style={{ color: "red" }} id="deletetooltip" onClick={() => onDelete(v.id)} />
                  </>
                ),
              };
            });
            setSimpleCruds(data);
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
            SimpleCrudApi.deleteSimpleCrud(id)
              .then((res) => {
                Swal.fire("Deleted!", res.data.message, "success");
                getAllSimpleCruds(activeData);
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
    getAllSimpleCruds(data)
    }


    const handleRowChange = (v) => {
    setActiveData({ activePage: activeData.activePage, totalPage: activeData.totalPage, search: activeData.search, limit: v });
    const data = { activePage: activeData.activePage, totalPage: activeData.totalPage, search: activeData.search, limit: v }
    getAllSimpleCruds(data)
    }


    //meta title
    document.title = props.t("SimpleCruds")+' | '+props.t("Rj");

    return (
        <div className="page-content">
            <div className="container-fluid">
            <Breadcrumbs title={props.t("Profile")} breadcrumbItem={props.t("SimpleCruds")} />
            <Link to="/add-simple-crud" className="btn btn-primary w-xs btn-right">{props.t("Add")}</Link>
            </div>

            

            <div className="container-fluid">
                    <DataTable
                      className="table-bordered"
                      progressPending={loading}
                      columns={columns}
                      data={SimpleCruds}
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
SimpleCruds.propTypes = {
    t: PropTypes.any,
    preGlobalFilteredRows: PropTypes.any,

};
export default withTranslation()(SimpleCruds);