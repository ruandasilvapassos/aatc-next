import React,{useState, forwardRef, useImperativeHandle} from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import Email from "@material-ui/icons/Email";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import CustomInput from "../CustomInput/CustomInput.js";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  inputAdornment: {
    position: "relative",
  },
  outer: {
    margin: "0 auto !important",
  },
};

const Step2 = forwardRef((props, ref) => {
  const [company, setcompany] = useState("");
  const [companyState, setcompanyState] = useState("");
  const [firstname, setfirstname] = useState("");
  const [firstnameState, setfirstnameState] = useState("");
  const [lastname, setlastname] = useState("");
  const [lastnameState, setlastnameState] = useState("");
  const [email, setemail] = useState("");
  const [emailState, setemailState] = useState("");
  const [phone, setphone] = useState("");
  const [phoneState, setphoneState] = useState("");
  const stateFunctions = {
    setemailState: (value) => setemailState(value),
    setemail: (value) => setemail(value),
    setphoneState: (value) => setphoneState(value),
    setphone: (value) => setphone(value),
    setlastnameState: (value) => setlastnameState(value),
    setlastname: (value) => setlastname(value),
    setfirstnameState: (value) => setfirstnameState(value),
    setfirstname: (value) => setfirstname(value),
    setcompanyState: (value) => setcompanyState(value),
    setcompany: (value) => setcompany(value),
  };
  const sendState = () => {
    return {
      company,
      companyState,
      firstname,
      firstnameState,
      lastname,
      lastnameState,
      email,
      emailState,
      phone,
      phoneState,
    };
  };
  // function that returns true if value is email, false otherwise
  const verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  const change = (event, stateName, type, stateNameEqualTo, maxValue) => {
    switch (type) {
      case "email":
        if (verifyEmail(event.target.value)) {
          stateFunctions["set" + stateName + "State"]("success");
        } else {
          stateFunctions["set" + stateName + "State"]("error");
        }
        break;
      case "length":
        if (verifyLength(event.target.value, stateNameEqualTo)) {
          stateFunctions["set" + stateName + "State"]("success");
        } else {
          stateFunctions["set" + stateName + "State"]("error");
        }
        break;
      case "phone":
          stateFunctions["set" + stateName + "State"]("success");
        break;
      default:
        break;
    }
    stateFunctions["set" + stateName](event.target.value);
  };
  const isValidated = () => {
    if (
      companyState === "success" &&
      firstnameState === "success" &&
      lastnameState === "success" &&
      phoneState === "success" &&
      emailState === "success"
    ) {
      return true;
    } else {
      if (companyState !== "success") {
        setcompanyState("error");
      }
      if (firstnameState !== "success") {
        setfirstnameState("error");
      }
      if (lastnameState !== "success") {
        setlastnameState("error");
      }
      if (emailState !== "success") {
        setemailState("error");
      }
      if (phoneState !== "success") {
        setphoneState("error");
      }
    }
    return false;
  };
  useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    sendState: () => {
      return sendState();
    },
  }));
  const { classes } = props;
  return (
    <GridContainer justify="center" item sm={10} className={classes.outer}>
      <GridItem item={true} xs={12} sm={12}>
        <h4 className={classes.infoText}>
          Let{"'"}s start with the basic information (with validation)
        </h4>
      </GridItem>
      <GridItem item={true} xs={12} sm={12}>
      <CustomInput
          success={companyState === "success"}
          error={companyState === "error"}
          labelText="Company"
          id="company"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (event) => change(event, "company", "length", 3),
          }}
        />
      </GridItem>
      <GridItem item={true} xs={12} sm={6}>
        <CustomInput
          success={firstnameState === "success"}
          error={firstnameState === "error"}
          labelText={
            <span>
              First Name <small>(required)</small>
            </span>
          }
          id="firstname"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (event) => change(event, "firstname", "length", 3),
          }}
        />
        </GridItem>
        <GridItem item={true} xs={12} sm={6}>
        <CustomInput
          success={lastnameState === "success"}
          error={lastnameState === "error"}
          labelText={
            <span>
              Last Name <small>(required)</small>
            </span>
          }
          id="lastname"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (event) => change(event, "lastname", "length", 3),
          }}
        />
      </GridItem>
      <GridItem item={true} xs={12} sm={6} md={6} lg={6}>
        <CustomInput
          success={emailState === "success"}
          error={emailState === "error"}
          labelText={
            <span>
              Email <small>(required)</small>
            </span>
          }
          id="email"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (event) => change(event, "email", "email"),
          }}
        />
         </GridItem>
      <GridItem item={true} xs={12} sm={6} md={6} lg={6}>
        <CustomInput
          labelText="Phone"
          id="phone"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (event) => change(event, "phone", "phone"),
          }}
        />
      </GridItem>
    </GridContainer>
  );
});

Step2.propTypes = {
  classes: PropTypes.object,
};
Step2.displayName = 'Step2';
export default withStyles(style)(Step2);
