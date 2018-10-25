import React from 'react';
import Navigation from "../components/Navigation";
import ToDoElement from "../components/ToDoElement";
import Modal, {ModalLabelsInterface} from "../components/Modal";

export default class ToDo extends React.Component {

  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
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
          show={this.state.show}
          closeCallback={false}
          actionCallback={this.hideModal}
          labels={labels}
        >
          {modalContent}
        </Modal>
      </div>
    );
  }
}