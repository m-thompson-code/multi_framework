export interface iProperties {
  property: string;
  text: string;
  type: string;
  options?: iOptionsInput | iOptionsTextarea;
  required?: boolean;
}

export interface iOptionsInput {
  default?: any;
  placeholder: string;
  type: string;
  validations?: iValidationsString | iValidationsNumber;
}

export interface iOptionsTextarea {
  default?: any;
  placeholder: string;
  maxLength: number;
}

export interface iValidations {
  required?: {
    value: boolean;
    message?: string;
  };
  max?: {
    value: number;
    message?: string;
  };
  min?: {
    value: number;
    message?: string;
  };
}

export interface iValidationsString extends iValidations {
  regex?: {
    value: RegExp;
    message?: string;
  };
}

export interface iValidationsNumber extends iValidations {
  wholeNumber?: {
    value: boolean;
    message?: string;
  };
}
