import React from 'react';

export interface RecorderInterfaceProps {
  disabled: boolean
  status: boolean
  callback: any
}

export default class Recorder extends React.Component<RecorderInterfaceProps, {}> {

  static defaultProps = {
    status: false,
    disabled: false,
  };

  render() {

    return (
      <div
        className={`recorder ${this.props.status ? 'stop-recording-class' : 'start-recording-class'}`}
        onClick={this.props.disabled ? () => {} : () => this.props.callback()}
        style={{
          opacity: this.props.disabled ? .5 : 1,
        }}
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