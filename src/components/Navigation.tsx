import React from 'react';
import Recorder from "./navigation/Recorder";

export interface NavigationStatesInterface {
  recorderStatus: boolean
}

export default class Navigation extends React.Component<{}, NavigationStatesInterface> {

  state = {
    recorderStatus: false,
  };

  _renderListOfRecordsButton = () => {
    return (
      <div>list of records button</div>
    );
  };

  _renderCreateToDoButton = () => {
    return (
      <div>Add new button</div>
    );
  };

  _changeRecordingStatus = () => {
    this.setState({
      recorderStatus: !this.state.recorderStatus
    });
  };

  render() {
    return (
      <div className="content">
        <div className="navigation">

          <div className="nav-section">
              <Recorder status={this.state.recorderStatus} callback={this._changeRecordingStatus}/>
          </div>
          <div className="nav-section">
              {this._renderListOfRecordsButton()}
          </div>
          <div className="nav-section">
              {this._renderCreateToDoButton()}
          </div>
        </div>
      </div>
    );
  }
}