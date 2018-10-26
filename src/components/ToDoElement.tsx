import React from 'react';
import moment from 'moment';
import {triggerAsyncId} from "async_hooks";

const editIcon = require('../assets/images/pencil-icon.svg') as string;
const removeIcon = require('../assets/images/trash.svg') as string;
const saveIcon = require('../assets/images/save-icon.svg') as string;

export interface ToDoInterface {
  id: number;
  name: string;
  description: string;
  date: moment.Moment
}

export interface ToDoElementPropsInterface {
  // todo: ToDoInterface
}

export default class ToDoElement extends React.Component<ToDoElementPropsInterface, {}> {

  render() {
    return (
      <div className="content">
        <div className="todo-element">

          <div className="todo-content">
            <div className="todo-content__header">
              <div>
                12 # Name of Todo
              </div>
              <div>
                23 Nov 2018
              </div>
            </div>
            <div className="todo-content__description todo-short-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi
              <div className="todo-short-description__cover" />
            </div>
          </div>

          <div className="todo-nav">
            <div>
              <img src={editIcon} alt="todo edit"/>
            </div>
            <div>
              <span>more ...</span>
            </div>
            <div>
              <img src={removeIcon} alt="todo remove"/>
            </div>
          </div>

        </div>
      </div>
    );
  }
}