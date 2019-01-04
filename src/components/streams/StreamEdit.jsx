import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    console.log("[StreamEdit] componentDidMount");
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    /**
     * Output formValues:
     * when initialValue={_.pick(this.props.stream, "title", "description")} in <StramForm />: {title: "Java Stream", description: "Stream Video on JAVA"}
     * when initialValue={this.props.stream} in <StramForm />: {description: "Stream Video on JAVA", id: 5, title: "Java Stream", userId: "114166151919402336768"}
     */
    console.log(formValues);
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    console.log("[StreamEdit] render() props", this.props.stream);

    if (!this.props.stream) {
      return <div>Loading ...</div>;
    }

    /**
     * The "key" property of initial values must be same to the Field name of Redux Form
     * initialValues={{title: 'custom title'}} === <Field name="title" /> in this case
     * initialValues is a customr properties provided by Redux-Form
     */
    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm
          //   initialValues={{
          //     title: this.props.stream.title,
          //     description: this.props.stream.description
          //   }}
          //   initialValues={this.props.stream}
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //   console.log("[StreamEdit] ownProps", ownProps);
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
