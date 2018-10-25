import * as React from "react";

export interface ModalLabelsInterface {
  cancel: string;
  confirm: string;
}

export interface ModalPropsInterface {
  children: any;
  show: boolean;
  closeCallback: any;
  actionCallback: any;
  labels: ModalLabelsInterface
}

export default class Modal extends React.Component<ModalPropsInterface, {}> {

  static defaultProps = {
    show: false,
    labels: {
      cancel: 'cancel',
      confirm: 'confirm',
    }
  };

  render() {
    return (
      <div className={this.props.show ? 'modal modal-show' : 'modal modal-hide'}>
        <section className="modal-main">
          <div className="modal-content">
            {this.props.children}
          </div>
          <div className="modal-controls">
            {this.props.closeCallback && (
            <div className="modal-controller">
              <button className="modal-button modal-button__reject" onClick={this.props.closeCallback}>
                {this.props.labels.cancel}
              </button>
            </div>
            )}
            {this.props.actionCallback && (
              <div className="modal-controller">
                <button className="modal-button modal-button__confirm" onClick={this.props.actionCallback}>
                  {this.props.labels.confirm}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
};
