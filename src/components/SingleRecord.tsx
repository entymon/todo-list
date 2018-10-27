import React from 'react';
import {SnapshotInterface} from "../services/RecorderService";
import Modal from "./Modal";
const removeIcon = require('../assets/images/trash.svg') as string;

export interface SingleRecordPropsInterface {
  snapshots: Array<SnapshotInterface>
  snapshotId: string;
  removeCallback: any;
}

export interface SingleRecordStatsInterface {
  played: boolean;
  showAlert: boolean;
}

export default class SingleRecord extends React.Component<SingleRecordPropsInterface, SingleRecordStatsInterface> {

  state = {
    played: false,
    showAlert: false
  };

  _startPlaying = () => {
    this.setState({
      played: true
    })
  };

  _pausePlaying = () => {
    this.setState({
      played: false
    })
  };

  _removeHandler = () => {
    this.setState({
      showAlert: true
    })
  };

  _hideAlertModal = () => {
    this.setState({
      showAlert: false
    })
  };

  render() {

    const alertModalContent = (
      <div>
        <h2>Alert</h2>
        <p>Do you want to remove this card?</p>
      </div>
    );

    return (
      <div id={`recording-${this.props.snapshotId}`} className="single-record">
        <div className="single-record__header">
          <div className="title">Session ID: {this.props.snapshotId}</div>
          <div className="controls">

            <div className="control-icon fast-play-icon" />

            {!this.state.played && (<div
              className="control-icon play-icon"
              onClick={this._startPlaying}
            />)}

            {this.state.played && (<div
              className="control-icon pause-icon"
              onClick={this._pausePlaying}
            />)}

            <div className="control-icon trash-icon" onClick={this._removeHandler}>
              <img src={removeIcon} alt="record remove"/>
            </div>

          </div>
        </div>
        <div className="single-record__content">
          {
            this.props.snapshots.map((element: SnapshotInterface, index: number) => (
              <div className="record-snapshot" key={index} data-store={JSON.stringify(element.storeSnapshot)}>
                <span>{index + 1}: </span><span>{element.status}</span>
              </div>
              ))
          }
        </div>

        <Modal
          show={this.state.showAlert}
          closeCallback={this._hideAlertModal}
          actionCallback={() => {
            this.setState({ showAlert: false });
            this.props.removeCallback(this.props.snapshotId);
          }}
          labels={{
            cancel: 'No',
            confirm: 'Yes'
          }}
          actions={{
            showCancel: true,
            showConfirm: true
          }}
        >
          {alertModalContent}
        </Modal>
      </div>
    );
  }
}