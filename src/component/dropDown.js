import {
  FormControl,
  InputLabel,
  MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

const DropDown = (props) => {
  DropDown.propTypes = {
    displayText: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    selection: PropTypes.array,
    selected: PropTypes.string,
    setSelected: PropTypes.func,
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 250 }}>
      <InputLabel id={props.id}>{props.displayText}</InputLabel>
      <Select
        id={props.id}
        value={props.selected}
        label={props.label}
        onChange={(event) => {
          props.setSelected(event.target.value);
        }}
      >
        {_.map(_.range(props.selection.length), (index) => (
          <MenuItem value={`${props.selection[index]}`}>
            {`${props.selection[index]}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
