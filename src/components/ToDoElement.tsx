import React from 'react';
import moment from 'moment';
import {triggerAsyncId} from "async_hooks";
import {DATE_FORMAT} from "../constants/Constants";

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
}

export default class ToDoElement extends React.Component<ToDoElementPropsInterface, ToDoElementStatesInterface> {

  state: ToDoElementStatesInterface = {
    showMoreLess: false,
    activeDescCover: true
  };

  _toggleMoreLess = () => {
    this.setState({
      showMoreLess: !this.state.showMoreLess
    });
  };

  componentDidMount() {
    const desciptionContentHeight = document.getElementById(`todo-description-${this.props.data.id}`).offsetHeight;
    if (desciptionContentHeight < 200) {
      this.setState({
        activeDescCover: false
      })
    }
  };

  render() {

    const showMoreLess = this.state.activeDescCover ? (this.state.showMoreLess ? 'less' : 'more ...') : '';
    const todoDescriptionCoverClass = this.state.activeDescCover ? (this.state.showMoreLess ? '' : 'todo-short-description') : '';

    return (
      <div id={`todo-${this.props.data.id}`} className="content">
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
              <div className="todo-short-description__cover" />
            </div>
          </div>

          <div className="todo-nav">
            <div>
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
      </div>
    );
  }
}