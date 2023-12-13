/**
 * Wraps action creator with dispatch function
 *
 * @template T
 *
 * @param {function} dispatch - Dispatch function.
 * @param {T} actionCreator - Object with action creators.
 *
 * @return {T} actionCreator wrapped with dispatch function.
 *
 */
export const withDispatch = (dispatch, actionCreator) => {
  const wrapped = {};

  for (const key in actionCreator) {
    wrapped[key] = (...args) => {
      dispatch(actionCreator[key](...args));
    };
  }

  return wrapped;
};
