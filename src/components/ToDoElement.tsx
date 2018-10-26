import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {DATE_FORMAT} from "../constants/Constants";
import Modal, {ModalLabelsInterface} from "./Modal";
import {CreateToDoFormErrorInterface} from "./CreateForm";
import ToDoService from "../services/ToDoService";

const editIcon = require('../assets/images/pencil-icon.svg') as string;
const removeIcon = require('../assets/images/trash.svg') as string;
const saveIcon = require('../assets/images/save-icon.svg') as string;

export interface ToDoElementInterface {
  id: number;
  name: string;
  description: string;
  date: moment.Moment
}

export interface ToDoElementPropsInterface {
  data: ToDoElementInterface,
  removeCallback: any,
  editCallback: any
}

export interface ToDoElementStatesInterface {
  showMoreLess: boolean;
  activeDescCover: boolean;
  editMode: boolean;
  showConfirmFlag: boolean;

  id: number;
  name: string;
  description: string;
  date: moment.Moment;
  errors: CreateToDoFormErrorInterface
}

export default class ToDoElement extends React.Component<ToDoElementPropsInterface, ToDoElementStatesInterface> {

  state: ToDoElementStatesInterface = {
    showMoreLess: false,
    activeDescCover: true,
    editMode: false,
    showConfirmFlag: false,

    id: 0,
    name: '',
    description: '',
    date: moment(),
    errors: {
      name: false,
      description: false
    }
  };

  _toggleMoreLess = () => {
    this.setState({
      showMoreLess: !this.state.showMoreLess
    });
  };

  _editMode = () => {
    this.setState({
      editMode: true
    })
  };

  _viewMode = () => {
    this.setState({
      editMode: false,
      name: '',
      description: '',
      date: moment(),
    })
  };

  _showConfirmModal = () => {
    const errors = ToDoService.validForm({
      name: this.state.name,
      description: this.state.description,
      date: this.state.date,
    });

    if (ToDoService.formValid) {

      // clear form
      this.setState({
        errors: {
          name: false,
          description: false,
        },
        showConfirmFlag: true
      });

    } else {

      // send form errors
      this.setState({
        showConfirmFlag: false,
        errors
      })
    }

  };

  _hideConfirmModal = () => {
    this.setState({
      showConfirmFlag: false
    })
  };

  _updateToDoElement = () => {
    // return data
    this.props.editCallback({
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      date: this.state.date,
    });

    this.setState({
      editMode: false,
      showConfirmFlag: false
    })
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

  componentDidMount() {
    const descriptionContentHeight = document.getElementById(`todo-description-${this.props.data.id}`).offsetHeight;
    if (descriptionContentHeight < 200) {
      this.setState({
        activeDescCover: false,
        id: this.props.data.id,
        name: this.props.data.name,
        description: this.props.data.description,
        date: this.props.data.date,
      })
    }
  };

  render() {

    const showMoreLess = this.state.activeDescCover ? (this.state.showMoreLess ? 'less' : 'more ...') : '';
    const todoDescriptionCoverClass = this.state.activeDescCover ? (this.state.showMoreLess ? '' : 'todo-short-description') : '';

    const labels: ModalLabelsInterface = {
      cancel: 'NO',
      confirm: 'YES',
    };

    const confirmModalContent = (
      <div>
        <h2>Confirm</h2>
        <p>Do you want update this card?</p>
      </div>
    );

    return (
      <div id={`todo-${this.props.data.id}`} className="content">
        {!this.state.editMode && (
          <div className="todo-element">
            <div className="todo-content">
              <div className="todo-content__header">
                <div>
                  {this.props.data.id} # {this.props.data.name}
                </div>
                <div>
                  {this.props.data.date.format(DATE_FORMAT)}
                </div>
              </div>
              <div className={`todo-content__description ${todoDescriptionCoverClass}`}>
                <div id={`todo-description-${this.props.data.id}`}>
                  {this.props.data.description}
                </div>
                <div className="todo-short-description__cover"/>
              </div>
            </div>
            <div className="todo-nav">
              <div onClick={this._editMode}>
                <img src={editIcon} alt="todo edit"/>
              </div>
              <div onClick={this._toggleMoreLess}>
                <span>{showMoreLess}</span>
              </div>
              <div onClick={() => this.props.removeCallback(this.props.data.id)}>
                <img src={removeIcon} alt="todo remove"/>
              </div>
            </div>
          </div>
        )}

        {this.state.editMode && (
          <div className="todo-element">
            <div className="todo-content">
              <div className="todo-content__header">
                <div>
                  {this.state.id} # <input
                  className="input"
                  id="todo-name"
                  name="todo-name"
                  value={this.state.name}
                  onChange={this._handleChangeName}
                  placeholder="ToDo title"
                />
                </div>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this._handleChangeDate}
                    dateFormat={DATE_FORMAT}
                  />
                </div>
              </div>
              <div className={`todo-content__description ${todoDescriptionCoverClass}`}>
                <div id={`todo-description-${this.props.data.id}`}>
                  <textarea
                    className="text-area edit-form"
                    placeholder="ToDo description"
                    cols={30}
                    rows={5}
                    value={this.state.description}
                    onChange={this._handleChangeDescription}
                  />
                </div>
                <div className="todo-short-description__cover"/>
              </div>
            </div>

            <div className="todo-nav">
              <div onClick={this._showConfirmModal}>
                <img src={saveIcon} alt="todo update"/>
              </div>
              <div onClick={this._viewMode}>
                <span>close</span>
              </div>
              <div onClick={() => this.props.removeCallback(this.props.data.id)}>
                <img src={removeIcon} alt="todo remove"/>
              </div>
            </div>
          </div>
        )}

        <Modal
          show={this.state.showConfirmFlag}
          closeCallback={this._hideConfirmModal}
          actionCallback={this._updateToDoElement}
          labels={labels}
          actions={{
            showCancel: true,
            showConfirm: true
          }}
        >
          {confirmModalContent}
        </Modal>
      </div>
    );
  }
}