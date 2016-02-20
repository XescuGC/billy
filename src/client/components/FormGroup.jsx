import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Input                from './Input';

class FormGroup extends Component {
  render() {
    const { name, value } = this.props;
    return (
      <div {...this.props}>
        <label htmlFor={name}>{`${name.split('_').map( n => n[0].toUpperCase() + n.slice(1,n.length)).join(' ')}`}</label>
        <Input {...this.props.inputEvents} value={value} name={name} />
      </div>
    )
  }
}

FormGroup.propTypes = {
  value:        React.PropTypes.node.isRequired,
  name:         React.PropTypes.string.isRequired,
  inputEvents:  React.PropTypes.object,
}

FormGroup.defaultProps = {
  className:  'form-group',
  value:      '',
}

export default FormGroup;
