/* eslint react/no-unused-prop-types: 0 */
import { Component } from 'react';
import PropTypes from 'prop-types';

class Field extends Component {
  render() {
    const { children } = this.props;
    return children;
  }
}

// This is a wrapper class so we can recognise form fields
// the form component also looks for some props on this object
// so it is worthwhile validating them here.
Field.propTypes = {
  children: PropTypes.node.isRequired,
  getValidationError: PropTypes.func.isRequired,
  valueKey: PropTypes.string.isRequired,
};

export {
  Field,
};
