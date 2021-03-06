import React from 'react';
import Recorder from "./Recorder";
import Button from "./parts/Button";
import ListIcon from "./parts/ListIcon";
import PlusIcon from "./parts/PlusIcon";
import ListOfRecords from "./ListOfRecords";
import CreateForm, {CreateFormToDoResponseInterface} from "./CreateForm";
import {connect} from "react-redux";
import {ToDoElementInterface} from "./ToDoElement";
import {setActionName, updateToDo} from "../store/actions/ToDoActions";
import ToDoService from "../services/ToDoService";
import RecorderService from "../services/RecorderService";
import {setKeyForRecordSession} from "../store/actions/RecorderActions";
import {ACTIONS, RECORD_SESSION_NOT_SET} from "../constants/Constants";

const recorder = new RecorderService();

export interface NavigationStatesInterface {
  recorderStatus: boolean,
  toggleListOfRecords: boolean,
  toggleAddNewToDo: boolean
  storage: any;
}

export interface NavigationPropsInterface {
  recordSessionKey?: string;
  actionName?: string;
  store?: any;
  played?: boolean;
  todoList?: Array<ToDoElementInterface>;
  dispatch?: any;
  playedSessionId?: string;
}

@(connect((store: any) => {
  return {
    store,
    recordSessionKey: store.recorderReducer.key,
    todoList: store.todoReducer.todoList,
    actionName: store.todoReducer.actionName,
    played: store.recorderReducer.played,
    playedSessionId: store.recorderReducer.playedSessionId,
  }
}) as any)
export default class Navigation extends React.Component<NavigationPropsInterface, NavigationStatesInterface> {

  state = {
    recorderStatus: false,
    toggleListOfRecords: false,
    storage: {},

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

      this.props.dispatch(setKeyForRecordSession(RECORD_SESSION_NOT_SET));
      this.props.dispatch(setActionName(ACTIONS.STOP_RECORDING));

      recorder.closeSession(this.props.recordSessionKey, {
        storeSnapshot: this.props.store.todoReducer,
        status: ACTIONS.STOP_RECORDING
      });
    } else { // start recording
      const key = ToDoService.getShortUuid();

      this.props.dispatch(setKeyForRecordSession(key));
      this.props.dispatch(setActionName(ACTIONS.START_RECORDING));

      recorder.openSession(key, {
        storeSnapshot: this.props.store.todoReducer,
        status: ACTIONS.START_RECORDING
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

  /**
   * Add new todo element
   */
  _addToDoFormCallback = (model: CreateFormToDoResponseInterface, confirm: boolean) => {
    if (confirm) {
      const toDo: ToDoElementInterface = {
        id: ToDoService.getShortUuid(),
        name: model.name,
        description: model.description,
        date: model.date
      };

      const updateToDoList = this.props.todoList.concat(toDo);
      this.props.dispatch(updateToDo(updateToDoList, ACTIONS.CREATE_TODO));
    }

    this.setState({
      toggleAddNewToDo: false
    })

  };

  _updateStorage = () => {
    this.forceUpdate();
  };

  componentDidMount () {
    this.setState({
      storage: recorder.getSessionStorage()
    })
  }

  shouldComponentUpdate(newProps: any, newState: any) {
    if (newProps.recordSessionKey !== RECORD_SESSION_NOT_SET) {
      if ([ACTIONS.CREATE_TODO].includes(newProps.actionName)) {
        recorder.updateSession(newProps.recordSessionKey, {
          storeSnapshot: newProps.store,
          status: newProps.actionName
        });
        this.props.dispatch(setActionName(ACTIONS.RESET))
      }
    }
    return true;
  };

  render() {
    const storage = recorder.getSessionStorage();
    const disableList = Object.keys(this.state.storage).length === 0;

    return (
      <div className="content">

        <div className="navigation">

          <div className="nav-section">
            <Recorder
              status={this.state.recorderStatus}
              callback={this._changeRecordingStatus}
              disabled={this.props.played}
            />
          </div>
          <div className="nav-section">
            <Button
              active={this.state.toggleListOfRecords}
              label={'List of Records'}
              icon={this._renderListIcon()}
              disabled={disableList || this.props.played} // if list of records is empty its nothing to see
              callback={this._toggleListOfRecords}
            />
          </div>
          <div className="nav-section">
            <Button
              active={this.state.toggleAddNewToDo}
              label={this.state.toggleAddNewToDo ? 'Close' : 'Create'}
              icon={this._renderPlusIcon()}
              disabled={this.props.played}
              callback={this._toggleCreateToDo}
            />
          </div>
        </div>

        {/* TODO: Remove after test */}
        <div className="hidden-content__inner">
          <ListOfRecords
            sessions={storage}
            callbackStorageUpdate={this._updateStorage}
          />
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
              <ListOfRecords
                sessions={storage}
                callbackStorageUpdate={this._updateStorage}
              />
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
}