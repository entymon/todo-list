import React from 'react';
import {SnapshotInterface} from "../services/RecorderService";

export interface SingleRecordPropsInterface {
  snapshots: Array<SnapshotInterface>
  snapshotId: string;
}

export default class SingleRecord extends React.Component<SingleRecordPropsInterface, {}> {

  render() {

    return (
      <div className="single-record">
        <div className="single-record__header">
          <div className="title">Session ID: {this.props.snapshotId}</div>
          <div className="controls">Play/Stop Remove</div>
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
      </div>
    );
  }
}