# React Simple Form Validation

A simple lightweight package to help with validating forms and displaying errors on inputs.

## Installation

```bash
npm install --save react-simple-form-validation
```

or

```bash
yarn add react-simple-form-validation
```

## How to use

The concept behind this library is that you can style and structure your form however you wish and you just wrap your inputs in Field tags. This will inject the onChange, value and errorMessage props into your input component.

```
import React, { Component } from 'react';
import { Form, Field } from 'react-simple-form-validation';

const TextInput = ({ onChange, errorMessage, value }) => (
  <div>
    <input
      type="text"
      onChange={event => onChange(event.target.value)}
      value={value}
    />
    <div>{errorMessage}</div>
  <div>
);

class MyForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      isValid: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange({ firstName, lastName }, isValid) {
    this.setState({
      firstName,
      lastName,
      isValid,
    });
  }

  render() {
    return (
      <Form onChange={this.onChange} values={this.state.values}>
        <h1>Your details</h1>
        <div>
          <Field
            valueKey="firstName"
            getValidationError={(value) => value === '' ? 'First name is required' : ''}
          >
            <TextInput />
          </Field>
          <div>
            <Field
              valueKey="lastName"
              getValidationError={(value) => value === '' ? 'Last name can not be blank' : ''}
            >
              <TextInput />
            </Field>
          </div>
          <div>Please fill in your details</div>
        </div>
      </Form>
    );
  }
}
```

## Components

### `Form`

Wrap your fields in a `Form` component which handles the changing of values and validation of fields.

#### `values: object`

A key/value pair of values for the form. The keys should correspond to the `fieldKey` props passed to the `Field` components in the `Form`

#### `onChange: (newValues: object, isValid: boolean) => any`

A change handler which will be called when the form values change. It will be called the the object of new values and a boolean value stating whether the current values are valid.

#### `children: Component`

The children passed through can be in any format. They should contain `Field` components in order to make use of the `Form`.

#### `showErrors?: boolean`

A boolean value which determines whether the `Form` should pass the error messages through to the components.

### `Field`

Wrap your input components in a field to let the `Form` know they need watching for changes and validation.

#### `valueKey: string`

This key should correspond to the key name on the `values` prop passed to the `Form`. The `fieldKey` should be unique otherwise the `Form` will throw an error.

#### `getValidationError: (value: any) => string`

A function which returns a validation error based on the current value of the `Field`. The `Form` assumes if this function returns the empty string then the `Field` is valid.

#### `children: Component`

The child should be a component which takes the props `errorMessage: string`, `onChange: (newValue: any) => any` and `value: any`.

## Issues

Please log any issues to the issue tracker in GitHub [[Issues](https://github.com/elcheshoro/react-simple-form-validation/issues)].

## Authors

Alexander Cheshire
