import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {DATE_FORMAT} from "../constants/Constants";
import Modal, {ModalLabelsInterface} from "./Modal";

export interface CreateFormToDoResponseInterface {
  name: string;
  description: string;
  date: moment.Moment;
}

export interface CreateToDoFormErrorInterface {
  name: boolean,
  description: boolean
}

export interface CreateToDoFormStatesInterface {
  name: string;
  description: string;
  date: moment.Moment;
  showConfirmModal: boolean;
  errors: CreateToDoFormErrorInterface
}

export interface CreateToDoFormPropsInterface {
  callback: any;
}

export default class CreateForm extends React.Component<CreateToDoFormPropsInterface, CreateToDoFormStatesInterface> {

  state = {
    name: '',
    description: '',
    date: moment(),
    showConfirmModal: false,

    errors: {
      name: false,
      description: false
    }
  };

  _showConfirmModal = () => {
    this.setState({
      showConfirmModal: true
    });
  };

  _hideConfirmModal = () => {
    this.setState({
      showConfirmModal: false
    });
  };

  _handleChangeDate = (date: moment.Moment) => {
    this.setState({
      date: date
    })
  };

  _handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: event.target.value
    })
  };

  _handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      description: event.target.value
    })
  };

  _handleSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    this._showConfirmModal();

    this.setState({
      name: '',
      description: '',
      date: moment(),
    });

    // add logic to save ToDo
    // to check if everythign is valid

    this.props.callback({
      name: this.state.name,
      description: this.state.description,
      date: this.state.date,
    }, true);
    event.preventDefault();
  };

  render() {

    const labels: ModalLabelsInterface = {
      cancel: '',
      confirm: 'OK',
    };

    const modalContent = (
      <div>
        <h2>ToDo Create</h2>
        <p>Task was successfully created.</p>
      </div>
    );

    return (
      <div className="create-form">
        <form onSubmit={this._handleSubmitForm}>
          <div className="create-form__top">

            <div className="input-field">
              <label htmlFor="todo-name">
                <div className="input-label">
                  <p className="title">Name</p>
                  <span className="error-note">Error message</span>
                </div>
                <input
                  className="input"
                  id="todo-name"
                  name="todo-name"
                  value={this.state.name}
                  onChange={this._handleChangeName}
                  placeholder="ToDo title"
                />
              </label>
            </div>

            <div className="date-field">
              <label htmlFor="todo-name">
                <div className="input-label">
                  <p className="title">Date</p>
                </div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this._handleChangeDate}
                  dateFormat={DATE_FORMAT}
                />
              </label>

            </div>

          </div>

          <div className="create-form__bottom">

            <div className="textarea-field">
              <label>
                <div className="textarea-label">
                  <p className="title">Description</p>
                  <span className="error-note">Error message</span>
                </div>
                <textarea
                  className="text-area"
                  placeholder="ToDo description"
                  cols={30}
                  rows={5}
                  value={this.state.description}
                  onChange={this._handleChangeDescription}
                />
              </label>
            </div>
          </div>

          <div className="create-form__submit">
            <button className="submit-button" type="submit" value="Submit">
              Save
            </button>
          </div>
        </form>

        <Modal
          show={this.state.showConfirmModal}
          closeCallback={this._hideConfirmModal}
          actionCallback={this._hideConfirmModal}
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