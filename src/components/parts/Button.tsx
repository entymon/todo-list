import React from 'react';

export interface IconButtonInterfaceProps {
  label: string | false,
  icon: any | false,
  disabled: boolean,
  active: boolean,
  callback: any
}

export default class Button extends React.Component<IconButtonInterfaceProps, {}> {

  static defaultProps = {
    label: false,
    icon: false,
    active: false,
    disabled: false,
  };

  render() {

    return (
      <div
        className={`button ${this.props.active ? 'button-active' : ''}`}
        onClick={() => this.props.callback()}
        style={{
          opacity: this.props.disabled ? 0.4 : 1,
        }}
      >
        {this.props.label && (<div className='button__label'>{this.props.label}</div>)}
        {this.props.icon && (<div className='button__icon'>{this.props.icon}</div>)}
      </div>
    );
  }
}