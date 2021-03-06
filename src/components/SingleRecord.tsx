import React from 'react';
import {SnapshotInterface} from "../services/RecorderService";
import Modal from "./Modal";
import {connect} from "react-redux";
import {savePresentToDoState, setPlayedSessionId, stopPlaying} from "../store/actions/RecorderActions";
import RecorderService from "../services/RecorderService";
import {playEpisode} from "../store/actions/ToDoActions";
const removeIcon = require('../assets/images/trash.svg') as string;
const restoreIcon = require('../assets/images/restore-icon.png') as string;

export interface SingleRecordPropsInterface {
  snapshots: Array<SnapshotInterface>
  snapshotId: string;
  removeCallback: any;
  dispatch?: any;
  todoReducer?: any;
  restore?: any;
  played?: boolean;
}

export interface SingleRecordStatsInterface {
  showAlert: boolean;
}

@(connect((store: any) => {
  return {
    todoReducer: store.todoReducer,
    restore: store.recorderReducer.restore,
    played: store.recorderReducer.played
  }
}) as any)
export default class SingleRecord extends React.Component<SingleRecordPropsInterface, SingleRecordStatsInterface> {

  state = {
    showAlert: false,
  };

  _startPlaying = (key: string) => {
    const recorder = new RecorderService();
    recorder.getSession(key, (storeSnapshots: Array<any>) => {

      this.props.dispatch(savePresentToDoState(this.props.todoReducer));
      this.props.dispatch(setPlayedSessionId(key));

      storeSnapshots.map((singleSnapshot: any) => {

        /**
         * TODO: add queue ith delay between events
         */
        this.props.dispatch(playEpisode(singleSnapshot.storeSnapshot));
      });

    });
  };

  stopPlayingAndRestoreSession = () => {
    this.props.dispatch(playEpisode(this.props.restore));
    this.props.dispatch(stopPlaying());
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

            {!this.props.played && (<div
              className="control-icon play-icon"
              onClick={() => this._startPlaying(this.props.snapshotId)}
            />)}

            {this.props.played && (<div
              className="control-icon restore-icon"
              onClick={this.stopPlayingAndRestoreSession}
            >
              <img src={restoreIcon} alt="restore remove"/>
            </div>)}

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