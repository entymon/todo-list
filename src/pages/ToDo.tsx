import React from 'react';
import {connect} from "react-redux";
import moment = require("moment");
import Navigation from "../components/Navigation";
import ToDoElement, {ToDoElementInterface} from "../components/ToDoElement";
import Modal, {ModalLabelsInterface} from "../components/Modal";
import {setActionName, updateToDo} from "../store/actions/ToDoActions";
import {ACTIONS, RECORD_SESSION_NOT_SET} from "../constants/Constants";
import RecorderService from "../services/RecorderService";

const recorder = new RecorderService();

export interface ToDoPagePropsInterface {
  recordSessionKey?: string;
  actionName?: string;
  store?: any;
  todoList?: Array<ToDoElementInterface>;
  dispatch?: any;
}

export interface ToDoPageStatesInterface {
  showAlert: boolean;
  showConfirm: boolean;
  todoId: number;
  fadeOut: boolean;
}

@(connect((store: any) => {
  return {
    store,
    recordSessionKey: store.recorderReducer.key,
    todoList: store.todoReducer.todoList,
    actionName: store.todoReducer.actionName
  }
}) as any)
export default class ToDo extends React.Component<ToDoPagePropsInterface, ToDoPageStatesInterface> {

  state = {
    showAlert: false,
    showConfirm: false,
    todoId: 0,
    fadeOut: false
  };

  _showAlertModal = (id: number) => {
    this.setState({
      showAlert: true,
      todoId: id
    });
  };

  _hideAlertModal = () => {
    this.setState({ showAlert: false });
  };

  _testToDoObject = () => {
    const updateToDoList = this.props.todoList.concat({
      id: 1,
      name: 'Test',
      description: 'sadasdsadsad asd sda sd',
      date: moment()
    });
    this.props.dispatch(updateToDo(updateToDoList));
  };

  /**
   * Animation for removed element
   * @param {number} id
   * @private
   */
  _fadingDone = (id: number) => {
    const filteredList = this.props.todoList.filter(element =>
      element.id !== id
    );
    this.props.dispatch(updateToDo(filteredList, ACTIONS.REMOVE_TODO));
  };

  /**
   * Remove TODO element
   * @private
   */
  _removeToDoElement = () => {
    if (this.state.todoId !== 0) {

      const elementId = `todo-${this.state.todoId}`;
      const elementDOM = document.getElementById(elementId);
      elementDOM.addEventListener('animationend', () => this._fadingDone(this.state.todoId));
      elementDOM.classList.add('fade-out');
      this._hideAlertModal();
    }
  };

  /**
   * Update TODO element
   * @param {ToDoElementInterface} data
   * @private
   */
  _updateToDoElement = (data: ToDoElementInterface) => {
    const filteredList = this.props.todoList.filter(element =>
      element.id !== data.id
    );
    const updateList = filteredList.concat(data);
    this.props.dispatch(updateToDo(updateList, ACTIONS.UPDATE_TODO));
  };

  componentDidMount() {
    // this._testToDoObject();
  }

  shouldComponentUpdate(newProps: any, newState: any) {
    if (newProps.recordSessionKey !== RECORD_SESSION_NOT_SET) {
      if ([ACTIONS.REMOVE_TODO, ACTIONS.UPDATE_TODO].includes(newProps.actionName)) {
        recorder.updateSession(newProps.recordSessionKey, {
          storeSnapshot: newProps.store.todoReducer,
          status: newProps.actionName
        });
        this.props.dispatch(setActionName(ACTIONS.RESET));
      }
    }
    return true;
  };

  render() {

    const labels: ModalLabelsInterface = {
      cancel: 'NO',
      confirm: 'YES',
    };

    const alertModalContent = (
      <div>
        <h2>Alert</h2>
        <p>Do you want to remove this card?</p>
      </div>
    );

    return (
      <div className="page">

        <Navigation />
        {
          this.props.todoList && this.props.todoList.map((element: ToDoElementInterface) => (
            <ToDoElement
              key={`todo-element-${element.id}`}
              data={element}
              removeCallback={this._showAlertModal}
              editCallback={this._updateToDoElement}
            />
          ))
        }

        <Modal
          show={this.state.showAlert}
          closeCallback={this._hideAlertModal}
          actionCallback={this._removeToDoElement}
          labels={labels}
          actions={{
            showCancel: true,
            showConfirm: true
          }}
        >
          {alertModalContent}
        </Modal>
      </div>
    );
  }
}