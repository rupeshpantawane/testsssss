// src/components/filter.
import React, { useMemo } from "react";
import PropTypes from 'prop-types';

//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import { withTranslation } from "react-i18next";

function Users(props) {
    const columns = useMemo(
        () => [
            {
                Header: 'First Name',
                accessor: 'firstName',
            },
        ],
        []
    );

    const data = [
        // {
        //     "firstName": "Test"
        // }
    ];

     //meta title
    document.title = "Users | MedX";

    return (
        <div className="page-content">
            <div className="container-fluid">
                <Breadcrumbs title="User" breadcrumbItem="Users" />
                <center><h1>{props.t("Coming Soon")}</h1></center>
                {/* <Table columns={columns} data={data} /> */}
                {/* <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    className="custom-header-css"
                /> */}
            </div>
        </div>
    );
}
Users.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};

export default withTranslation()(Users);