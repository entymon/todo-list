import React from 'react';

export interface RecorderProps {
  status: boolean
  callback: any
}

export default class Recorder extends React.Component<RecorderProps, {}> {

  static defaultProps = {
    status: false,
  };

  render() {

    console.log(this.props.status, 'status');
    return (
      <div
        className={`recorder ${this.props.status ? 'stop-recording-class' : 'start-recording-class'}`}
        onClick={() => this.props.callback()}
      >
        <div>Recording: </div>
        <div
          className="recording-icon"
          style={{
            transition: 'all .2s',
            borderRadius: this.props.status ? 0 : '100%',
            background: this.props.status ? '#FF0000' : '#000'
          }}
        />
        <div>{ this.props.status ? `Stop` : `Start`}</div>
      </div>
    );
  }
}