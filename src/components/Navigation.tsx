import React from 'react';
import Recorder from "./Recorder";
import Button from "./parts/Button";
import ListIcon from "./parts/ListIcon";
import PlusIcon from "./parts/PlusIcon";
import ListOfRecords from "./ListOfRecords";
import CreateForm, {CreateFormToDoResponseInterface} from "./CreateForm";
import {connect} from "react-redux";
import {ToDoElementInterface} from "./ToDoElement";
import {updateToDo} from "../store/actions/ToDoActions";
import ToDoService from "../services/ToDoService";
import RecorderService from "../services/RecorderService";
import {setKeyForRecordSession} from "../store/actions/RecorderActions";
import {RECORD_SESSION_NOT_SET} from "../constants/Constants";

const recorder = new RecorderService();
const recordStorage = recorder.getSessionStorage();

export interface NavigationStatesInterface {
  recorderStatus: boolean,
  toggleListOfRecords: boolean,
  toggleAddNewToDo: boolean
}

export interface NavigationPropsInterface {
  recordSessionKey?: string;
  store?: any;
  todoList?: Array<ToDoElementInterface>;
  dispatch?: any;
}

@(connect((store: any) => {
  return {
    store,
    recordSessionKey: store.recorderReducer.key,
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

  /**
   * Open new record session
   * @private
   */
  _changeRecordingStatus = () => {

    if (this.state.recorderStatus) { // stop recording
      recorder.closeSession(this.props.recordSessionKey, {
        storeSnapshot: this.props.store,
        status: 'close'
      });
      this.props.dispatch(setKeyForRecordSession(RECORD_SESSION_NOT_SET));
    } else { // start recording
      const key = ToDoService.getShortUuid();
      this.props.dispatch(setKeyForRecordSession(key));
      recorder.openSession(key, {
        storeSnapshot: this.props.store,
        status: 'open'
      });
    }

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

    const storage = recorder.getSessionStorage();
    const disableList = Object.keys(storage).length === 0;

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
              disabled={disableList} // if list of records is empty its nothing to see
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

        {/* TODO: Remove after test */}
        <div className="hidden-content__inner">
          <ListOfRecords sessions={storage}/>
        </div>

        {/* Show only if add new is close and list of storage elements is not empty */}
        {!this.state.toggleAddNewToDo && !disableList && (
          <div
            className="hidden-content"
            style={{
              maxHeight: this.state.toggleListOfRecords ? '500px' : '0',
            }}
          >
            <div className="hidden-content__inner">
              <ListOfRecords sessions={storage}/>
            </div>
          </div>
        )}

        {/* Show only if list of record sessions close */}
        {!this.state.toggleListOfRecords && (
          <div
            className="hidden-content"
            style={{
              maxHeight: this.state.toggleAddNewToDo ? '500px' : '0',
            }}
          >
            <div className="hidden-content__inner">
              <CreateForm callback={this._addToDoFormCallback}/>
            </div>
          </div>
        )}
      </div>
    );
  }

  _addToDoFormCallback = (model: CreateFormToDoResponseInterface, confirm: boolean) => {
    if (confirm) {
      const toDo: ToDoElementInterface = {
        id: ToDoService.getShortUuid(),
        name: model.name,
        description: model.description,
        date: model.date
      };

      const updateToDoList = this.props.todoList.concat(toDo);
      this.props.dispatch(updateToDo(updateToDoList));
    }

    this.setState({
      toggleAddNewToDo: false
    })

  }
}