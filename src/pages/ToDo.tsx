import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import moment = require("moment");
import Navigation from "../components/Navigation";
import ToDoElement, {ToDoElementInterface} from "../components/ToDoElement";
import Modal, {ModalLabelsInterface} from "../components/Modal";
import {updateToDo} from "../store/actions/ToDoActions";
import {element} from "prop-types";

export interface ToDoPagePropsInterface {
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
    todoList: store.todoReducer.todoList,
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
    this.props.dispatch(updateToDo(filteredList));
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
    filteredList.concat(data);
    this.props.dispatch(updateToDo(filteredList));
  };

  componentDidMount() {
    this._testToDoObject();
  }

  render() {

    const labels: ModalLabelsInterface = {
      cancel: 'NO',
      confirm: 'YES',
    };

    const alertModalContent = (
      <div>
        <h2>Alert</h2>
        <p>Are you really would like remove this card?</p>
      </div>
    );

    return (
      <div className="page">

        <Navigation />
        {
          this.props.todoList.map((element: ToDoElementInterface) => (
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