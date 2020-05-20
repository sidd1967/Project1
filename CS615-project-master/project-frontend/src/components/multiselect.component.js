import React, { Component } from "react";
import CreatableSelect from "react-select/creatable";

const components = {
  DropdownIndicator: null,
};

class CreatableMulti extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CreatableSelect
        components={components}
        isMulti
        isClearable
        menuIsOpen={false}
        inputValue={this.props.inputValue}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
        onInputChange={this.props.onInputChange}
        onKeyDown={this.props.onKeyDown}
        value={this.props.value}
      />
    );
  }
}

export default CreatableMulti;
