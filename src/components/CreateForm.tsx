import React, {DOMElement} from 'react';

export default class CreateForm extends React.Component {

  state = {
    name: '',
    description: '',
    date: ''
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