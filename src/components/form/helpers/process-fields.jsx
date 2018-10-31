import { cloneElement } from 'react';
import { Field } from '../../field/field';

// This function assumes it is going to return jsx but
// can also be used to run any code when a field is found.
const processFields = (children, onField) => {
  if (Array.isArray(children)) {
    // There is no other unique key which can be used other than index and since the order
    // of the form is unlikely to change we should not see a hit in performance.
    return children.map((child, index) => {
      const element = processFields(child, onField);
      return element ? cloneElement(element, { key: index }) : null;
    });
  }

  if (!children.props || !children.props.children) {
    return children;
  }

  if (children.type === Field) {
    return onField(children);
  }

  return cloneElement(children, { children: processFields(children.props.children, onField) });
};

export {
  processFields,
};
