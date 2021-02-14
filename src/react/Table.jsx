import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import UserManager from "./UserManager";
import { Button } from "@material-ui/core";

import { connect } from "react-redux";
import { getUsers, selectId, toggleDialog } from "../redux/actions";
import axios from "axios";

const columns = [
  { id: "id", label: "id", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "username", label: "username", minWidth: 100 },
  {
    id: "email",
    label: "email",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "phone",
    label: "phone",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "website",
    label: "website",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "20rem",
  },
  buttonsWithPagination: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  createButton: {
    backgroundColor: "green",
    color: "#dfdfdf",
    borderRadius: "50%",
    boxShadow: "0.1rem 0.1rem 0.1rem yellow",
    "&:hover": {
      backgroundColor: "green",
    },
    "&:active": {
      boxShadow: "0.1rem 0.1rem 0.1rem transparent",
    },
  },
  updateButton: {
    backgroundColor: "yellow",
    borderRadius: "50%",
    boxShadow: "-0.1rem 0.1rem 0.1rem green",
    "&:hover": {
      backgroundColor: "yellow",
    },
    "&:active": {
      boxShadow: "-0.1rem 0.1rem 0.1rem transparent",
    },
  },

  tableRow: {
    cursor: "pointer",
  },
  tableRowSelected: {
    backgroundColor: "yellow !important",
    color: "green",
    cursor: "pointer",
  },
});

function StickyHeadTable({
  rows,
  toggleDialog,
  dialogState,
  select,
  getUsers,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedTableRowId, setSelectedTableRowId] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://jsonplaceholder.typicode.com/users");

      console.log(result.data);
      getUsers(result.data);
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    onClick={() => {
                      setSelectedTableRowId(row.id);
                      select(row.id);
                    }}
                    className={
                      selectedTableRowId === row.id
                        ? classes.tableRowSelected
                        : classes.tableRow
                    }
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.buttonsWithPagination}>
        <Button
          className={classes.createButton}
          onClick={() => toggleDialog(dialogState)}
        >
          create
        </Button>
        {/* <Button
          className={classes.updateButton}
          onClick={() => {
            toggleDialog(dialogState);
            select(selectedTableRowId);
          }}
        >
          update
        </Button> */}
        <TablePagination
          rowsPerPageOptions={[1, 5, 10, 20, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
      <UserManager />
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    rows: state.usersReducer,
    dialogState: state.dialogReducer.dialogState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDialog: (dialogState) => dispatch(toggleDialog(dialogState)),
    select: (id) => dispatch(selectId(id)),
    getUsers: (users) => dispatch(getUsers(users)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StickyHeadTable);
