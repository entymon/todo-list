import React from 'react';
import Recorder from "./navigation/Recorder";
import Button from "./parts/Button";
import ListIcon from "./parts/ListIcon";
import PlusIcon from "./parts/PlusIcon";

export interface NavigationStatesInterface {
  recorderStatus: boolean,
  toggleListOfRecords: boolean,
  toggleAddNewToDo: boolean
}

export default class Navigation extends React.Component<{}, NavigationStatesInterface> {

  state = {
    recorderStatus: false,

    toggleListOfRecords: false,
    toggleAddNewToDo: false,
  };

  _toggleListOfRecords = () => {
    this.setState({
      toggleListOfRecords: !this.state.toggleListOfRecords
    })
  };

  _toggleCreateToDo = () => {
    this.setState({
      toggleListOfRecords: !this.state.toggleAddNewToDo
    })
  };

  _changeRecordingStatus = () => {
    this.setState({
      recorderStatus: !this.state.recorderStatus
    });
  };

  _renderListIcon = () => {
    return (
      <ListIcon status={false}/>
    );
  };

  _renderPlusIcon = () => {
    return (
      <PlusIcon status={false}/>
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
              <Button label={'Records List'} icon={this._renderListIcon()} callback={this._toggleListOfRecords}/>
          </div>
          <div className="nav-section">
            <Button label={'Add ToDo'} icon={this._renderPlusIcon()} callback={this._toggleCreateToDo}/>
          </div>
        </div>
      </div>
    );
  }
}