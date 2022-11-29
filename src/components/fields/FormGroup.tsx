import React, { ReactNode, useCallback, useRef, useState } from 'react';
import * as yup from 'yup';

import { setIn } from '@/helpers';

import { FormGroupContext, IFormGroupContextValue } from './FormGroupContext';

export type IFormRule = yup.BaseSchema;

export interface IFieldRule {
  validationRule?: IFormRule;
}

interface IFormGroupProps<TValues> {
  children: ReactNode,
  initialValues?: TValues;
  onSubmit?: (values: TValues) => void | Promise<void>;
  onValuesChange?: (values: TValues, oldValues: TValues, formInstance: IFormGroupContextValue<TValues>) => void | Promise<void>;
  onSubmitErrors?: (errors: any) => void;
}

export function FormGroup<TValues>(props: IFormGroupProps<TValues>) {
  const {
    children,
    initialValues,
    onSubmit: onSubmitDefault,
    onValuesChange,
  } = props;
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState<TValues>(initialValues ?? {} as TValues);
  const valuesRef = useRef(values);
  const titlesRef = useRef<{ [name: string]: string; }>({});
  const rulesRef = useRef<{ [name: string]: IFormRule; }>({});
  const errorCallbacksRef = useRef<{ [name: string]: (msg: string) => void; }>({});

  const updateFormValues = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (values: TValues) => {
      const oldValues = { ...valuesRef.current };
      let newValues = { ...valuesRef.current };
      const nextValuesKeys = Object.keys(values);

      for (const nextValueKey of nextValuesKeys) {

        const isPath = nextValueKey.includes('.');

        if (!isPath) {
          newValues[nextValueKey] = values[nextValueKey];
          continue;
        }

        newValues = setIn(newValues, nextValueKey, values[nextValueKey]);
      }

      valuesRef.current = newValues;
      setValues(newValues);
      onValuesChange?.(newValues, oldValues, { updateFormValues });
    },
    [onValuesChange]
  );

  const updateFormRule = useCallback((name: string, value: IFormRule) => {
    rulesRef.current[name] = value;
  }, []);

  const updateErrorCallback = useCallback((name: string, cb: (msg: string) => void) => {
    errorCallbacksRef.current[name] = cb;
  }, []);

  const updateTitle = useCallback((name: string, title: string) => {
    titlesRef.current[name] = title;
  }, []);

  const onSubmit = useCallback(
    async () => {
      if (submitting) {
        return;
      }

      for (const val in values) {
        if (values[val] === '') {
          values[val] = null;
        }
      }

      setSubmitting(true);

      let validationOk = true;

      const rules = rulesRef.current ?? {};

      for (const name of Object.keys(rules)) {
        let title = titlesRef.current[name];

        if (!title) {
          title = name;
        }

        const rule = rulesRef.current?.[name];
        const errorCallback = errorCallbacksRef.current?.[name];
        const ruleSchema = yup.object().shape({
          [title]: rule as yup.BaseSchema,
        });

        try {
          await ruleSchema.validate({ [title]: values[name] });
        }
        catch (e) {
          if (e instanceof Error) {
            errorCallback?.(e.message);
          }

          validationOk = false;
        }
      }

      if (!validationOk) {
        setSubmitting(false);
        return;
      }

      try {
        await onSubmitDefault?.(values);
      }
      catch (e) {
        props.onSubmitErrors?.(e);
      }
      finally {
        setSubmitting(false);
      }
    },
    [onSubmitDefault, props, submitting, values]
  );

  return (
    <FormGroupContext.Provider
      value={{
        onSubmit,
        initialValues: initialValues || {},
        values,
        updateFormValues,
        updateFormRule,
        updateErrorCallback,
        updateTitle,
        submitting,
      }}
    >
      {children}
    </FormGroupContext.Provider>
  );
}
