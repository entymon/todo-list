import React from 'react';

export interface IconButtonInterfaceProps {
  label: string | false,
  icon: any | false,
  callback: any
}

export default class Button extends React.Component<IconButtonInterfaceProps, {}> {

  static defaultProps = {
    label: false,
    icon: false,
  };

  render() {

    return (
      <div
        className="button"
        onClick={() => this.props.callback()}
      >
        {this.props.label && (<div className='button__label'>{this.props.label}</div>)}
        {this.props.icon && (<div className='button__icon'>{this.props.icon}</div>)}
      </div>
    );
  }
}