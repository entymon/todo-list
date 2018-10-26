import React from 'react';
import Navigation from "../components/Navigation";
import ToDoElement, {ToDoElementInterface} from "../components/ToDoElement";
import Modal, {ModalLabelsInterface} from "../components/Modal";
import {connect} from "react-redux";

export interface ToDoPagePropsInterface {
  todoList?: Array<ToDoElementInterface>
}

@(connect((store: any) => {
  return {
    todoList: store.todoReducer.todoList
  }
}) as any)
export default class ToDo extends React.Component<ToDoPagePropsInterface, {}> {

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

        <Navigation />

        {
          this.props.todoList.map((element: ToDoElementInterface) => (
            <ToDoElement
              key={`todo-element-${element.id}`}
              id={element.id}
              name={element.name}
              description={element.description}
              date={element.date}/>
          ))
        }
      </div>
    );
  }
}