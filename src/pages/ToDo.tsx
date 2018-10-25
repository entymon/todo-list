import React from 'react';
import Navigation from "../components/Navigation";
import ToDoElement from "../components/ToDoElement";
import Modal, {ModalLabelsInterface} from "../components/Modal";

export default class ToDo extends React.Component {

  state = {
    showSuccess: false,
    showAlert: false,
    showConfirm: false
  };

  showModal = () => {
    this.setState({ showSuccess: true });
  };

  hideModal = () => {
    this.setState({ showSuccess: false });
  };

  render() {

    const labels: ModalLabelsInterface = {
      cancel: 'NO',
      confirm: 'YES',
    };

    const modalContent = (
      <div>
        <h2>Modal</h2>
        <p>Data</p>
      </div>
    );

    return (
      <div className="page">

        <button onClick={this.showModal}>TEST MODAL</button>

        <Navigation />
        <ToDoElement/>
        
        <Modal
          show={this.state.showSuccess}
          closeCallback={this.hideModal}
          actionCallback={this.hideModal}
          labels={labels}
          actions={{
            showCancel: false,
            showConfirm: true
          }}
        >
          {modalContent}
        </Modal>
      </div>
    );
  }
}