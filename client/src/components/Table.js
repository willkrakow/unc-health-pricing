import React, { forwardRef } from "react";
import MaterialTable from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
const testCols = [
            { title: "Procedure", field: "procedure_name" },
            { title: "Base price", field: "price", type: "currency" },
            { title: `Aetna price`, field: `aetna_price`, type: "currency" },
            { title: `BCBS price`, field: `bcbs_price`, type: "currency" },
            { title: `Cash discount price`, field: `cash_price`, type: "currency" },
            { title: `Savings`, field: `savings`, type: "currency" }
    ]

// const calculateSavings = (data) => {
//     data.forEach((procedure) => {
//         const percent = (procedure.base_price - procedure.)
//     })
// }

const testData = [
    {
        id: 1234,
        procedure_name: "A bad thing",
        aetna_price: 1234.00,
        bcbs_price: 9843.23,
        cash_price: 134,
        base_price: 99999,
    },
    {
        id: 1234,
        procedure_name: "A second bad thing",
        aetna_price: 1234.00,
        bcbs_price: 9843.23,
        cash_price: 134,
        base_price: 99999,
    }
]



const Table = () => {
  return (
    <MaterialTable
      columns={testCols}
      data={testData}
      icons={tableIcons}
      title="Price data"
      style={{ border: "none", boxShadow: "none", background: "#f7feff",  }}
    />
  );
};

export default Table
