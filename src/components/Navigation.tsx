import React from 'react';
import Recorder from "./Recorder";
import Button from "./parts/Button";
import ListIcon from "./parts/ListIcon";
import PlusIcon from "./parts/PlusIcon";
import ListOfRecords from "./ListOfRecords";
import CreateForm, {CreateFormToDoResponseInterface} from "./CreateForm";
import {connect} from "react-redux";
import {ToDoElementInterface} from "./ToDoElement";
import {addToDo} from "../store/actions/ToDoActions";

export interface NavigationStatesInterface {
  recorderStatus: boolean,
  toggleListOfRecords: boolean,
  toggleAddNewToDo: boolean
}

export interface NavigationPropsInterface {
  todoList?: Array<ToDoElementInterface>;
  dispatch?: any;
}

@(connect((store: any) => {
  return {
    todoList: store.todoReducer.todoList
  }
}) as any)
export default class Navigation extends React.Component<NavigationPropsInterface, NavigationStatesInterface> {

  state = {
    recorderStatus: false,

    toggleListOfRecords: false,

    // Open add form if list of ToDo is empty
    toggleAddNewToDo: this.props.todoList.length === 0,
  };

  _toggleListOfRecords = () => {


    this.setState({
      toggleListOfRecords: !this.state.toggleListOfRecords,
      toggleAddNewToDo: false
    })
  };

  _toggleCreateToDo = () => {
    this.setState({
      toggleAddNewToDo: !this.state.toggleAddNewToDo,
      toggleListOfRecords: false
    })
  };

  _changeRecordingStatus = () => {
    this.setState({
      recorderStatus: !this.state.recorderStatus
    });
  };

  _renderListIcon = () => {
    return (
      <ListIcon status={false}/>
    );
  };

  _renderPlusIcon = () => {
    return (
      <PlusIcon status={false}/>
    );
  };

  render() {

    return (
      <div className="content">

        <div className="navigation">

          <div className="nav-section">
            <Recorder status={this.state.recorderStatus} callback={this._changeRecordingStatus}/>
          </div>
          <div className="nav-section">
            <Button
              active={this.state.toggleListOfRecords}
              label={'List of Records'}
              icon={this._renderListIcon()}
              disabled={true} // if list of records is empty its nothing to see
              callback={this._toggleListOfRecords}
            />
          </div>
          <div className="nav-section">
            <Button
              active={this.state.toggleAddNewToDo}
              label={this.state.toggleAddNewToDo ? 'Close' : 'Create'}
              icon={this._renderPlusIcon()}
              disabled={false}
              callback={this._toggleCreateToDo}
            />
          </div>
        </div>

        {!this.state.toggleAddNewToDo && (
          <div
            className="hidden-content"
            style={{
              maxHeight: this.state.toggleListOfRecords ? '500px' : '0',
            }}
          >
            <div className="hidden-content__inner">
              <ListOfRecords/>
            </div>
          </div>
        )}

        {!this.state.toggleListOfRecords && (
          <div
            className="hidden-content"
            style={{
              maxHeight: this.state.toggleAddNewToDo ? '500px' : '0',
            }}
          >
            <div className="hidden-content__inner">
              <CreateForm callback={this._createToDoFormUpdate}/>
            </div>
          </div>
        )}
      </div>
    );
  }

  _createToDoFormUpdate = (model: CreateFormToDoResponseInterface, confirm: boolean) => {
    if (confirm) {
      const toDo: ToDoElementInterface = {
        id: this.props.todoList.length + 1,
        name: model.name,
        description: model.description,
        date: model.date
      };

      const updateToDoList = this.props.todoList.concat(toDo);
      this.props.dispatch(addToDo(updateToDoList));
    }

    this.setState({
      toggleAddNewToDo: false
    })

  }
}