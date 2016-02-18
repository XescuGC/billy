import React, { Component } from 'react';
import { connect }          from 'react-redux';
import * as ServerActions   from '../actions/server';
import ConfigUser           from './ConfigUser';
import FormGroup            from './FormGroup';

class ConfigSection extends Component {
  render() {
    const { user, vat, currency } = this.props.config;
    return (
      <div>
        <div className='page-header'>
          <h1>Config</h1>
        </div>
        <ConfigUser
          user={user}
          onUpdate={this.onUpdateUserConfig.bind(this)}
        />
        <FormGroup value={vat} name={'vat'} />
        <FormGroup value={currency} name={'currency'} />
      </div>
    )
  }

  componentDidMount() {
    const { config, dispatch } = this.props;
    if (!Object.keys(config).length) dispatch(ServerActions.fetchConfig());
  }

  onUpdateUserConfig(e) {
    e.preventDefault();
    let user = {};
    $('#config-user').serializeArray().forEach( i => user[i.name] = i.value );
    this.props.dispatch(ServerActions.updateUserConfig(user));
  }
}

function select(state) {
  return {
    config: state.config
  }
}

export default connect(select)(ConfigSection);
