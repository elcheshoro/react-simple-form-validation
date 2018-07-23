# React Simple Form Validation

A simple lightweight package to help with validating forms and displaying errors on inputs.

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

  onChange({ username, password }, isValid) {
    this.setState({
      username,
      password,
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

## Authors

Alexander Cheshire
