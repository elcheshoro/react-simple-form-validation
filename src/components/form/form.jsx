import { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

import { processFields } from './helpers/process-fields';

class Form extends Component {
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
    const { values, showErrors } = this.props;
    return processFields(
      childrenToProcess,
      ({ props: { valueKey, children, getValidationError } }) => {
        const value = values[valueKey];
        const childProps = children.props;
        const validationError = getValidationError(value);
        return cloneElement(children, {
          ...childProps,
          value,
          onChange: (newValue) => {
            this.onChange(
              newValue,
              valueKey,
            );
            childProps.onChange(newValue);
          },
          errorMessage: showErrors ? validationError : '',
        });
      },
    );
  }

  render() {
    const { children } = this.props;
    return this.renderChildren(children);
  }
}

Form.defaultProps = {
  showErrors: true,
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  showErrors: PropTypes.bool,
};

export {
  Form,
};
