import React from 'react';
import {SnapshotInterface} from "../services/RecorderService";
import Modal from "./Modal";
import {connect} from "react-redux";
import {savePresentToDoState} from "../store/actions/RecorderActions";
import RecorderService from "../services/RecorderService";
import {playEpisode} from "../store/actions/ToDoActions";
const removeIcon = require('../assets/images/trash.svg') as string;

export interface SingleRecordPropsInterface {
  snapshots: Array<SnapshotInterface>
  snapshotId: string;
  removeCallback: any;
  dispatch?: any;
  todoReducer?: any;
}

export interface SingleRecordStatsInterface {
  played: boolean;
  showAlert: boolean;
}

@(connect((store: any) => {
  return {
    todoReducer: store.todoReducer
  }
}) as any)
export default class SingleRecord extends React.Component<SingleRecordPropsInterface, SingleRecordStatsInterface> {

  state = {
    played: false,
    showAlert: false
  };

  _startPlaying = (key: string) => {
    this.setState({
      played: true
    });

    const recorder = new RecorderService();
    recorder.getSession(key, (storeSnapshots: Array<any>) => {

      this.props.dispatch(savePresentToDoState(this.props.todoReducer));

      storeSnapshots.map((singleSnapshot: any) => {

        /**
         * TODO: add queue ith delay between events
         */
        this.props.dispatch(playEpisode(singleSnapshot.storeSnapshot));
      });

    });
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
              onClick={() => this._startPlaying(this.props.snapshotId)}
            />)}

            {this.state.played && (<div
              className="control-icon stop-icon"
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