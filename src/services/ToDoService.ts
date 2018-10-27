import {CreateFormToDoResponseInterface, CreateToDoFormErrorInterface} from "../components/CreateForm";
const uuidv1 = require('uuid/v1');

export default class ToDoService {

  static formValid: boolean;

  static validForm = (formData: CreateFormToDoResponseInterface): CreateToDoFormErrorInterface => {

    ToDoService.formValid = true;

    const errors: CreateToDoFormErrorInterface = {
      name: false,
      description: false
    };

    if (formData.name === '') {
      errors.name = true;
      ToDoService.formValid = false;
    }
    if (formData.description === '') {
      errors.description = true;
      ToDoService.formValid = false;
    }

    return errors;
  };

  /**
   * Gets last part of UUID make it shorter
   * @returns {string | undefined}
   */
  static getShortUuid = () => {
    const uuid = uuidv1().split('-');
    return uuid.shift();
  }
}