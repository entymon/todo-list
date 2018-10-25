import React from 'react';
import Recorder from "./Recorder";
import Button from "./parts/Button";
import ListIcon from "./parts/ListIcon";
import PlusIcon from "./parts/PlusIcon";
import ListOfRecords from "./ListOfRecords";
import CreateForm from "./CreateForm";

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
      toggleAddNewToDo: !this.state.toggleAddNewToDo
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
            <Button
              active={this.state.toggleListOfRecords}
              label={'List of Records'}
              icon={this._renderListIcon()}
              disabled={true} // if list of records is empty its nothing to see
              callback={this._toggleListOfRecords}
            />
          </div>
          <div className="nav-section">
            <Button
              active={this.state.toggleAddNewToDo}
              label={this.state.toggleAddNewToDo ? 'Close' : 'Create'}
              icon={this._renderPlusIcon()}
              disabled={false}
              callback={this._toggleCreateToDo}
            />
          </div>
        </div>

        <div
          className="hidden-content records-list"
          style={{
            maxHeight: this.state.toggleListOfRecords ? '500px' : '0',
          }}
        >
          <ListOfRecords/>
        </div>

        <div
          className="hidden-content create-form"
          style={{
            maxHeight: this.state.toggleAddNewToDo ? '500px' : '0',
          }}
        >
          <CreateForm/>
        </div>
      </div>
    );
  }
}