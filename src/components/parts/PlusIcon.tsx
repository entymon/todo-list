import React from 'react';

export interface PlusIconInterfaceProps {
  status: boolean
}

export default class PlusIcon extends React.Component<PlusIconInterfaceProps, {}> {

  static defaultProps = {
    status: false,
  };

  render() {
    return (
      <div className="plus-icon-wrapper">
        <div className='plus-icon'></div>
      </div>
    );
  }
}