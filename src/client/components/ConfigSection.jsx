import React, { Component } from 'react';
import { connect }          from 'react-redux';
import * as ServerActions   from '../actions/server';
import ConfigUser           from './ConfigUser';
import ConfigGlobal         from './ConfigGlobal';

class ConfigSection extends Component {
  render() {
    const { user, global } = this.props.config;
    return (
      <div>
        <div className='page-header'>
          <h1>Config</h1>
        </div>
        <ConfigUser
          user={user}
          onUpdate={this.onUpdateUserConfig.bind(this)}
        />
        <ConfigGlobal
          global={global}
          onUpdate={this.onUpdateGlobalConfig.bind(this)}
        />
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

  onUpdateGlobalConfig(e) {
    e.preventDefault();
    let global = {};
    $('#config-global').serializeArray().forEach( i => global[i.name] = i.value );
    //this.props.dispatch(ServerActions.updateGlobalConfig(global));
  }
}

function select(state) {
  return {
    config: state.config
  }
}

export default connect(select)(ConfigSection);
