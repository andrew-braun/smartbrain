import React, { Component } from "react";
import Clarifai from "clarifai";
import Particles from "react-particles-js";
import Navigation from "./components/navigation/navigation.js";
import Logo from "./components/logo/logo.js";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm";
import FaceRecognition from "./components/faceRecognition/faceRecognition";
import Rank from "./components/rank/rank.js";
import "./App.css";
import SignIn from "./components/signIn/signIn";

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
      box: [],
      route: 'signin'
    };
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.querySelector("#input-image");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  generateBoundingBox = (box) => {
    this.setState({ box: box })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, `${this.state.input}`)
    .then(response => 
        this.generateBoundingBox(this.calculateFaceLocation(response))
    .catch(err => console.log(err))
    );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <header className="app-header">
          <Navigation />
        </header>
        { this.state.route === 'signin' 
        ? <SignIn />
        :  <div> 
            <Logo /> 
              <main className="app-container">
                <ImageLinkForm
                  onButtonSubmit={this.onButtonSubmit}
                  onInputChange={this.onInputChange}
                />
                <Rank />
                <FaceRecognition 
                  imageUrl={this.state.imageUrl}
                  box={this.state.box} />
              </main>
           </div>
        }
      </div>
    );
  }
}

export default App;
