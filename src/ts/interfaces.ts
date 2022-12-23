export interface OptionsObject {
  occupations: string;
  states: StatesObject;
}

export interface StatesObject {
  name: string;
  abbreviation: string;
}

export interface FormProps {
  occupationOptions: string[];
  stateOptions: StatesObject[];
}

export interface FormSubmitObject {
  name: string;
  password: string;
  passwordConfirmation?: string;
  email: string;
  occupation: string;
  state: string;
}
