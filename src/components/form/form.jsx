import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

import { processFields } from './helpers/process-fields';

class Form extends Component {
  componentDidMount() {
    const { values, onChange } = this.props;
    onChange(values, this.isValid(values));
  }

  onChange(value, key) {
    const { values, onChange } = this.props;
    const newValues = Object.assign({}, values, { [key]: value });
    onChange(newValues, this.isValid(newValues));
  }

  isValid(values) {
    const { children } = this.props;
    const validationFunctionMap = {};
    processFields(children, ({ props: { valueKey, getValidationError } }) => {
      if (validationFunctionMap[valueKey]) {
        throw new Error('Duplicate key in form');
      }
      validationFunctionMap[valueKey] = getValidationError;
    });
    return Object.entries(validationFunctionMap).every(([key, value]) => value(values[key]) === '');
  }

  renderChildren(childrenToProcess) {
    const { values } = this.props;
    return processFields(
      childrenToProcess,
      ({ props: { valueKey, children, getValidationError } }) => {
        const value = values[valueKey];
        const childProps = children.props;
        const validationError = getValidationError(value);
        return (
          <div>
            {cloneElement(children, {
              ...childProps,
              value,
              onChange: (newValue) => {
                this.onChange(
                  newValue,
                  valueKey,
                );
                childProps.onChange(newValue);
              },
              errorMessage: validationError,
            })}
          </div>
        );
      },
    );
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {this.renderChildren(children)}
      </div>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
};

export {
  Form,
};
