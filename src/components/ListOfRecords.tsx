import React from 'react';
import {SessionStorageInterface} from "../services/RecorderService";
import SingleRecord from "./SingleRecord";

export interface ListOfRecordsPropsInterface {
  sessions: SessionStorageInterface
}

export default class ListOfRecords extends React.Component<ListOfRecordsPropsInterface, {}> {

  _removeRecordedSession = (snapshotId: string) => {

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