import React from 'react';

import { Field } from '../../../../src/components/field/field';

import { processFields } from '../../../../src/components/form/helpers/process-fields';

jest.mock('../../../../src/components/field/field');

test('returns the component if the component has no fields', () => {
  const onField = jest.fn();
  const component = (
    <div>
      Test component
    </div>
  );
  expect(processFields(component, onField)).toEqual(component);
});

test('doesn\'t call the field handler if the component has no fields', () => {
  const onField = jest.fn();
  const component = (
    <div>
      Test component
    </div>
  );
  processFields(component, onField);
  expect(onField).not.toHaveBeenCalled();
});

test('calls the handler when a field is found', () => {
  const onField = jest.fn();
  const component = (
    <Field>
      Test component
    </Field>
  );
  processFields(component, onField);
  expect(onField).toHaveBeenCalledWith(component);
});

test('returns the result of the handler for a field element', () => {
  const processedField = (
    <div>
      Processed
    </div>
  );
  const onField = jest.fn().mockReturnValue(processedField);
  const component = (
    <Field>
      Test component
    </Field>
  );
  expect(processFields(component, onField)).toEqual(processedField);
});

test('returns the result of the handler for a nested field element', () => {
  const processedField = (
    <div>
      Processed
    </div>
  );
  const onField = jest.fn().mockReturnValue(processedField);
  const component = (
    <div>
      <div>
        Test component
      </div>
      <Field>
        Test field
      </Field>
    </div>
  );
  expect(processFields(component, onField)).toEqual((
    <div>
      <div key={0}>
        Test component
      </div>
      <div key={1}>
        Processed
      </div>
    </div>
  ));
});

test('for an array of components it returns the array of results', () => {
  const firstProcessedField = (
    <div>
      First processed
    </div>
  );
  const secondProcessedField = (
    <div>
      Second processed
    </div>
  );
  const onField = jest.fn()
    .mockReturnValueOnce(firstProcessedField)
    .mockReturnValueOnce(secondProcessedField);
  const component = [
    (
      <Field>
        Test field
      </Field>
    ), (
      <Field>
        Another test field
      </Field>
    ),
  ];
  expect(processFields(component, onField)).toEqual([
    <div key={0}>
      First processed
    </div>,
    <div key={1}>
      Second processed
    </div>,
  ]);
});
