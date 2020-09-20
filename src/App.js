import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/navigation/navigation.js";
import Logo from "./components/logo/logo.js";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm";
import FaceRecognition from "./components/faceRecognition/faceRecognition";
import Rank from "./components/rank/rank.js";
import SignIn from "./components/signIn/signIn";
import Register from "./components/register/register";
import "./App.css";

/* Particle background */
const particlesOptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    shape: {
      type: "circle",
      stroke: {
        width: 10,
        color: "hsla(0, 0, 0%, 0.5)",
      },
    },
  },
};

/* Set initial state; reset to this on signout */
const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    email: "",
    name: "",
    id: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  /* Load user data into state on signin or register */
  loadUser = (data) => {
    this.setState({
      user: {
        email: data.email,
        name: data.name,
        id: data.id,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  /* Grabbing entered image URL to send to API */
  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  /* Using Clarifai response data to create a box corresponding to the four corner points
  of the rectangle surrounding a single detected face */
  calculateFaceLocation = (data) => {
    /* Getting coordinates from Clarifai response */
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    /* Getting data on the submitted image for box calculations */
    const image = document.querySelector("#input-image");
    const width = Number(image.width);
    const height = Number(image.height);

    /* Using the percentages returned by Clarifai to calculate points on image */
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  /* Function to wrap calculateFaceLocation and send result to state */
  generateBoundingBox = (box) => {
    this.setState({ box: box });
  };

  /* Calls Clarifai image API on submit button press */
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    /* Uses Clarifai npm library to process response */
    fetch("https://cryptic-journey-42100.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then((response) => {
        /* If response received, put box on returned coordinates, update user entry count */
        if (response) {
          fetch("https://cryptic-journey-42100.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch((err) => console.log(err));
        }
        this.generateBoundingBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  /* Detect route changes and change state accordingly for future conditional rendering */
  onRouteChange = (route) => {
    /* On sign-out, reset state; on sign-in set isSignedIn to true*/
    if (route === "signout" || route === "signin") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <header className="app-header">
          <Navigation
            onRouteChange={this.onRouteChange}
            isSignedIn={isSignedIn}
          />
        </header>
        {/* If route in state is home, render home */}
        {route === "home" ? (
          <div>
            <Logo />
            <main className="app-container">
              {/* Form for entering and submitting image link */}
              <ImageLinkForm
                onButtonSubmit={this.onButtonSubmit}
                onInputChange={this.onInputChange}
              />
              {/* Form for counting image submits */}
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              {/* Container for submitted picture and face detection box */}
              <FaceRecognition imageUrl={imageUrl} box={box} />
            </main>
          </div>
        ) : /* If route is sign in or register instead of home, direct to sign in/register page */
        route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
