import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

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

  _handleChangeDate = (event: any) => {
    this.setState({
      name: event.target.value
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
              <label htmlFor="todo-name">Name
                <span className="error-note">Error message</span>
                <input
                  className="input"
                  id="todo-name"
                  name="todo-name"
                  value={this.state.name}
                  onChange={this._handleChangeName}
                />
              </label>
            </div>

            <div className="date-field">
              <DatePicker
                selected={this.state.date}
                onChange={this._handleChangeDate}
              />
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