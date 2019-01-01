import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  //   renderInput(formProps) {
  //     console.log(formProps);
  //     return (
  //       //   <input
  //       //     onChange={formProps.input.onChange}
  //       //     value={formProps.input.value}
  //       //   />
  //       <input {...formProps.input} />
  //     );
  //   }
  renderInput({ input, label, meta }) {
    // console.log(input);
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} />
        <div>{meta.error}</div>
      </div>
    );
  }

  onSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    console.log(this.props);
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

/**
 *
 * key name of errors object and value of the name property of Field element must be same.
 * errors.title <Field name="title" /> in this case
 */
const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

export default reduxForm({
  form: "streamCreate",
  validate: validate
})(StreamCreate);
