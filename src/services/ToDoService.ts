import {CreateFormToDoResponseInterface, CreateToDoFormErrorInterface} from "../components/CreateForm";

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
  }
}