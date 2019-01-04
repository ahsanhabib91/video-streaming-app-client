import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
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

  renderError({ error, touched }) {
    // console.log(error);
    // console.log(touched);
    if (error && touched) {
      //   console.log("error called");
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = formProps => {
    // console.log(formProps);
    const { input, label, meta } = formProps;
    // console.log(input);
    // console.log(meta);
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    console.log(formValues);
    this.props.onSubmit(formValues);
  };

  /**
   * If the class error does not present in form tag, semantic-ui will hide any error message
   */
  render() {
    console.log("[StreamForm] props", this.props);
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
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
  //   console.log(formValues);
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
  form: "streamForm",
  validate: validate
})(StreamForm);

/**
 *  As StreamForm does not need to call action creator. The parent component will call action creator
 */
// export default connect(
//   null
//   { createStream }
// )(formWrapped);
