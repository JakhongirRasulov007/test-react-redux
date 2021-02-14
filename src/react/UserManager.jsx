import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import {
  Button,
  DialogActions,
  makeStyles,
  TextField,
  Dialog,
} from "@material-ui/core";
import { addUser, toggleDialog } from "../redux/actions";

const useStyles = makeStyles({
  container: {},
  dialog: {
    height: "100%",
    width: "100%",
  },
  dialogContent: {
    margin: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textFieldContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
  },
  textField: {
    width: "80%",
    marginTop: "0.5rem",
  },

  updateButton: {
    backgroundColor: "green",
    color: "#dfdfdf",
    "&:hover": {
      backgroundColor: "green",
    },
  },
  cancelButton: {
    backgroundColor: "red",
    marginLeft: "0.4rem",
    color: "#dfdfdf",
    "&:hover": {
      backgroundColor: "red",
    },
  },
});

function UserManager({ dialogState, toggle, addUser, selectedId, users }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  const classes = useStyles();

  useEffect(() => {
    users.map((user) => {
      if (user.id === selectedId) {
        console.log("user.id in UserManager useEffect: ", user.id);
        setId(user.id);
      }
    });
    console.log("initialize for update in useEffect", selectedId);
  }, [selectedId, users]);

  const handleClose = () => {};

  const applyChange = () => {
    if (
      id === "" ||
      name === "" ||
      username === "" ||
      email === "" ||
      phone === "" ||
      website === ""
    ) {
      alert("empty fields are not allowed");
    } else {
      addUser({ id, name, username, email, phone, website });
      toggle(dialogState);
      clearFields();
    }
  };

  const clearFields = () => {
    setId("");
    setName("");
    setUsername("");
    setEmail("");
    setPhone("");
    setWebsite("");
  };

  return (
    <div className={classes.container}>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={dialogState}
        className={classes.dialog}
      >
        <dialogContent className={classes.dialogContent}>
          <TextField
            id="id"
            label="id"
            variant="outlined"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className={classes.textField}
            required
            error={id == "" || id == null}
          />
          <TextField
            id="name"
            label="name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={classes.textField}
            required
            error={name == "" || name == null}
          />
          <TextField
            id="username"
            label="username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={classes.textField}
            required
            error={username == "" || username == null}
          />
          <TextField
            id="email"
            label="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.textField}
            required
            error={email == "" || email == null}
          />
          <TextField
            id="phone"
            label="phone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={classes.textField}
            required
            error={phone == "" || phone == null}
          />
          <TextField
            id="website"
            label="website"
            variant="outlined"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className={classes.textField}
            required
            error={website == "" || website == null}
          />
        </dialogContent>

        <DialogActions className={classes.buttonContainer}>
          <Button
            variant="contained"
            className={classes.updateButton}
            onClick={() => applyChange()}
          >
            create a user
          </Button>
          <Button
            variant="contained"
            className={classes.cancelButton}
            onClick={() => {
              console.log("selectedId in UserManager: ", selectedId);
              toggle(dialogState);
            }}
          >
            cancel change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dialogState: state.dialogReducer.dialogState,
    selectedId: state.dialogReducer.selectedId,
    users: state.usersReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
    toggle: (dialogState) => dispatch(toggleDialog(dialogState)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManager);
