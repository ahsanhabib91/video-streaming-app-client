import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    console.log("[GoogleAuth] componentDidMount");
    // for ref: https://developers.google.com/api-client-library/javascript/reference/referencedocs#authentication
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "402281566310-2o1mq99p5po4fovcffr8eu7p2qme6gsk.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          // console.log("Initialization Done");
          this.auth = window.gapi.auth2.getAuthInstance();
          // console.log("this.auth:", this.auth);
          this.onAuthChange(this.auth.isSignedIn.get());
          //   listen() passes true to this function when the user signs in, and false when the user signs out.
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    console.log("isSignedIn:", isSignedIn);
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    console.log("[GoogleAuth] render");
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  console.log("[GoogleAuth] state:", state);
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
