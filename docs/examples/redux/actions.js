const showResults = (formValues) => ({ type: 'save', formValues });

// Example submit validation for forms
const mapDispatchToProps = (dispatch) => ({
  updateValues: (values) => {
    dispatch({ type: 'update', values });
  },

  validateAndSave: (values) => {
    dispatch({ type: 'submitting', isSubmitting: true });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch({ type: 'submitting', isSubmitting: false });
        if (isNaN(Number(values.group))) {
          // alerting, however in reality would dispatch to an error state
          alert('Input must be a dollar amount.');  // eslint-disable-line no-alert
          reject('Input must be a dollar amount.');
        } else {
          dispatch(showResults(values));
          resolve();
        }
      }, 500); // simulate server latency
    });
  },
});

export default mapDispatchToProps;
