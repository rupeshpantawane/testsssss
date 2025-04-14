// src/components/filter.
import React, { useMemo } from "react";
import PropTypes from 'prop-types';

//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';

function UserPrograms() {
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
    document.title = "User Programs | MedX";

    return (
        <div className="page-content">
            <div className="container-fluid">
                <Breadcrumbs title="User" breadcrumbItem="User Programs" />
                <center><h1>Coming Soon</h1></center>
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
UserPrograms.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};


export default UserPrograms;