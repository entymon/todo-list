import React from 'react';

export interface ListIconInterfaceProps {
  status: boolean
}

export default class ListIcon extends React.Component<ListIconInterfaceProps, {}> {

  static defaultProps = {
    status: false,
  };

  render() {
    return (
      <div className="list-icon-wrapper">
        <div className="list-icon">
          <div className="list-icon__element"/>
          <div className="list-icon__element"/>
          <div className="list-icon__element-last"/>
        </div>
      </div>
    );
  }
}