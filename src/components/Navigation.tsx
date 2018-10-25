import React from 'react';
import Recorder from "./navigation/Recorder";
import Button from "./parts/Button";

export interface NavigationStatesInterface {
  recorderStatus: boolean
}

export default class Navigation extends React.Component<{}, NavigationStatesInterface> {

  state = {
    recorderStatus: false,

    toggleListOfRecords: false,
    toggleAddNewToDo: false,
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

  _listIconImage = () => {
    return (
      <div style={{
        width: '30px'
      }}>
        <div style={{
          borderTop: `3px solid #000`,
          paddingBottom: '10px'
        }}/>
        <div style={{
          borderTop: `3px solid #000`,
          paddingBottom: '10px'
        }}/>
        <div style={{
          borderTop: `3px solid #000`,
        }}/>
      </div>
    );
  };

  render() {
    return (
      <div className="content">
        <div className="navigation">

          <div className="nav-section">
              <Recorder status={this.state.recorderStatus} callback={this._changeRecordingStatus}/>
          </div>
          <div className="nav-section">
              <Button label={'Records List'} icon={this._listIconImage()} callback={() => {}}/>
          </div>
          <div className="nav-section">
              {this._renderCreateToDoButton()}
          </div>
        </div>
      </div>
    );
  }
}