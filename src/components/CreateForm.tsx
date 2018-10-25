import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {DATE_FORMAT} from "../constants/Constants";

interface CreateFormStatesInterface {
  name: string;
  description: string;
  date: moment.Moment;
}

export default class CreateForm extends React.Component<{}, CreateFormStatesInterface> {

  state = {
    name: '',
    description: '',
    date: moment()
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

  render() {
    return (
      <div className="create-form">
        <form>
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
                  placeholder="Title of TO DO"
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
                Description:
                <span className="error-note">Error message</span>
                <textarea
                  value={this.state.description}
                  onChange={this._handleChangeDescription}
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}