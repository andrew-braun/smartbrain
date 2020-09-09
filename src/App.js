import React, { Component } from "react";
import Clarifai from "clarifai";
import Particles from "react-particles-js";
import Navigation from "./components/navigation/navigation.js";
import Logo from "./components/logo/logo.js";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm";
import FaceRecognition from "./components/faceRecognition/faceRecognition";
import Rank from "./components/rank/rank.js";
import SignIn from "./components/signIn/signIn";
import Register from "./components/register/register";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "57c008f0aadb46e4a75b6ae94fe85334",
});

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

class App extends Component {
  constructor() {
    super();
    this.state = {
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
        joined: ""
      }
    };
    // console.log(this.state.user.name)
  }

  loadUser = (data) => {
    this.setState({user: {
      email: data.email,
      name: data.name,
      id: data.id,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector("#input-image");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  generateBoundingBox = (box) => {
    this.setState({ box: box });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, `${this.state.input}`)
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
        }
        this.generateBoundingBox(
          this.calculateFaceLocation(response))
        })
          .catch((err) => console.log(err))
    };

  onRouteChange = (route) => {
    if (route === "signout" || route === "signin") {
      this.setState({ isSignedIn: false });
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
        {route === "home" ? (
          <div>
            <Logo />
            <main className="app-container">
              <ImageLinkForm
                onButtonSubmit={this.onButtonSubmit}
                onInputChange={this.onInputChange}
              />
              <Rank 
                name={this.state.user.name}
                entries={this.state.user.entries}
                />
              <FaceRecognition imageUrl={imageUrl} box={box} />
            </main>
          </div>
        ) : route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} 
            loadUser={this.loadUser}
          />
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
