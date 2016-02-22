import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Input                from './Input';

class FormGroup extends Component {
  render() {
    const { name, value, label, inputEvents } = this.props;
    const prettyName = this.prettyName(name);
    return (
      <div {...this.props}>
        { label ? <label htmlFor={name}>{prettyName}</label> : null }
        <Input {...inputEvents} placeholder={prettyName} value={value} name={name} />
      </div>
    )
  }

  prettyName(name) { return name.split('_').map( n => n[0].toUpperCase() + n.slice(1,n.length)).join(' ') }
}

FormGroup.propTypes = {
  value:        React.PropTypes.node.isRequired,
  name:         React.PropTypes.string.isRequired,
  label:        React.PropTypes.bool.isRequired,
  inputEvents:  React.PropTypes.object,
}

FormGroup.defaultProps = {
  className:  'form-group',
  value:      '',
  label:      true,
}

export default FormGroup;
