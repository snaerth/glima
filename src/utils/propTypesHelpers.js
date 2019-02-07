/**
 * Allows null in propTypes
 *
 * @param {Object<PropTypes>}
 * @example
 *  prop: allowNull(PropTypes.number.isRequired)
 */
export default function allowNull(wrappedPropTypes) {
  return (props, propName, ...rest) => {
    if (props[propName] === null) return null;
    return wrappedPropTypes(props, propName, ...rest);
  };
}
