import React from 'react';
import {default as RecorderService, SessionStorageInterface} from "../services/RecorderService";
import SingleRecord from "./SingleRecord";

const recorder = new RecorderService();

export interface ListOfRecordsPropsInterface {
  sessions: SessionStorageInterface,
  callbackStorageUpdate: any;
}

export default class ListOfRecords extends React.Component<ListOfRecordsPropsInterface, {}> {

  /**
   * Animation for removed element
   * @param {number} id
   * @private
   */
  _fadingDone = (id: string) => {
    recorder.removeSession(id, () => {
      this.props.callbackStorageUpdate();
    });
  };

  /**
   * Remove TODO element
   * @private
   */
  _removeRecordedSession = (snapshotId: string) => {
      const elementId = `recording-${snapshotId}`;
      const elementDOM = document.getElementById(elementId);
      elementDOM.addEventListener('animationend', () => this._fadingDone(snapshotId));
      elementDOM.classList.add('fade-out');
  };

  /**
   * Render single records
   * @param {Array<string>} keys
   * @returns {any[]}
   * @private
   */
  _renderSingleRecord = (keys: Array<string>) => {
    return keys.map((sessionKey: string) => {
      const sessionContent = this.props.sessions[sessionKey];
      return (<SingleRecord
        key={sessionKey}
        snapshotId={sessionKey}
        snapshots={sessionContent}
        removeCallback={this._removeRecordedSession}
      />)
    });
  };

  render() {

    const sessionKeys = Object.keys(this.props.sessions);

    return (
      <div className="records-list">
        {this._renderSingleRecord(sessionKeys)}
      </div>
    );
  }
}