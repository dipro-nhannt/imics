import React from 'react';

import { IFormRule } from './FormGroup';

export interface IFormGroupContextValue<TValues> {
  submitting?: boolean;
  updateName?: string;
  values: TValues;
  initialValues?: TValues;
  onSubmit?: (values: TValues) => void;
  updateFormValues: (values: TValues) => void;
  updateFormRule: (name: string, rule?: IFormRule) => void;
  updateTitle: (name: string, title: string) => void;
  updateErrorCallback: (name: string, cb: (errorMsg: string) => void) => void;
}

export const FormGroupContext = React.createContext<IFormGroupContextValue<any>>({
  values: {},
  updateFormValues: () => { },
  updateFormRule: () => { },
  updateErrorCallback: () => { },
  updateTitle: () => { },
});
