import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactMic } from "react-mic";
import API from "../../utils/API";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./SpeechRecognition.css";

require("dotenv").config();

// var context;

// window.onload = function () {
//   context = new AudioContext();
//   // Setup all nodes
//   console.log(context);
// };

//------------------------SPEECH RECOGNITION-----------------------------

var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

recognition.continous = false;
recognition.maxAlternatives = 10;
recognition.interimResults = false;
recognition.lang = "en-US";
let finalTranscript = "";
let interimTranscript = "";
let randomWordArr = ["Incredible"];

//------------------------COMPONENT-----------------------------
class Dictaphone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Setting state for each individual sentence before submit
      sentence: "",
      // speech recognition
      listening: false,
      // Setting state for the react-mic
      downloadLinkURL: null,
      isRecording: false,
    };

    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
    this.resetTranscripts = this.resetTranscripts.bind(this);
    this.submitTranscripts = this.submitTranscripts.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.randomWordGenerator = this.randomWordGenerator.bind(this);
  }
  componentDidMount() {
    recognition.stop();
    // console.log(context);
  }
  componentDidUpdate() {
    // console.log(context);
  }

  // Toggle listening commands when the Start/Stop button is pressed
  toggleListen = () => {
    this.setState(
      {
        // speech recognition
        listening: !this.state.listening,
        // react-mic
        isRecording: !this.state.isRecording,
      },
      // speech recognition
      this.handleListen
    );
  };

  // speech recognition
  handleListen = () => {
    if (this.state.listening) {
      recognition.start();

      // this is what causes that weird jingle noise when deployed on the phone
      recognition.onend = () => {
        // this only lets you record your voice once and if you stop talking
        // it will not write anything else after it
        // recognition.onstart = () => {

        // console.log("...continue listening...");
        recognition.start();
      };
    } else {
      // } if (!this.state.listening) {
      recognition.stop();
      recognition.onend = () => {
        // console.log("Stopped listening per click");
      };
    }

    // speech recognition
    // Interim and final transcript are diplayed on the screen
    finalTranscript = "";
    recognition.onresult = (event) => {
      interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + " ";
        else interimTranscript += transcript;
        // console.log(finalTranscript);
      }
      document.getElementById(
        "interimTranscript"
      ).innerHTML = interimTranscript;
      document.getElementById("finalTranscript").innerHTML = finalTranscript;

      const transcriptArr = finalTranscript.split("  ");
      this.setState({ sentence: transcriptArr[0] });
      // console.log(transcriptArr[0]);
    };

    recognition.onerror = (event) => {
      event.preventDefault();
      console.log("Error occurred in recognition: " + event.error);
    };
  };

  // speech recognition
  // Reset the interim and final transcript to not display anymore
  resetTranscripts() {
    document.getElementById("interimTranscript").innerHTML = interimTranscript =
      "";
    document.getElementById("finalTranscript").innerHTML = finalTranscript = "";
    // console.log("All Records Cleared");
  }

  // speech recognition
  // Handles updating component state when the user speaks into the input field
  handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // speech recognition
  // Sumbit your finalTranscript to the database
  submitTranscripts() {
    if (this.state.sentence) {
      API.saveSentence({
        sentence: this.state.sentence,
      }).catch((err) => console.log(err));
    }
    // console.log("Transcript Submitted");
    // console.log(this.state.sentence);
  }

  // react-mic
  stopRecording = () => {
    this.setState({ isRecording: false });
  };

  // react-mic
  onSave = (blobObject) => {
    this.setState({
      downloadLinkURL: blobObject.blobURL,
    });
  };

  // react-mic
  onStop = (blobObject) => {
    this.setState({ blobURL: blobObject.blobURL });
  };

  // react-mic
  onBlock() {
    console.log("onBlock");
  }

  randomWordGenerator(event) {
    event.preventDefault();
    var randomWord = Math.floor(Math.random() * randomWordArr.length);
    var word = randomWordArr[randomWord];
    // console.log(word);
    document.getElementById("randomWordPlacement").innerHTML = word;
  }

  render() {
    // react-mic
    const { blobURL, isRecording } = this.state;

    return (
      <>
        <div id="speechWrapper">
          <Container id="exitContainer">
            <Link to="/">
              <Button id="exitButton">
                <h6 id="X">X</h6>
              </Button>
            </Link>
          </Container>
          <Container id="randomWordContainer">
            <Row id="randomWordRow">
              <Col id="randomWordCol">
                <div id="randomWordPlacement">
                  <br />
                </div>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row id="randomWordButtonRow">
              {/* change onClick laptop/desktop to onTouchStart mobile */}
              <Button id="randomWordButton" onClick={this.randomWordGenerator}>
                <div id="newWordText">NewWord/Timer</div>
              </Button>
            </Row>
            <Row id="oscilloscopeRow">
              <Col>
                <ReactMic
                  className="oscilloscope"
                  record={isRecording}
                  backgroundColor="#ffffff"
                  visualSetting="frequencyBars"
                  audioBitsPerSecond={128000}
                  onStop={this.onStop}
                  onSave={this.onSave}
                  onBlock={this.onBlock}
                  strokeColor="#00ff0db4"
                />
                <div id="audio-playback-controls">
                  <audio
                    ref="audioSource"
                    controls="controls"
                    src={blobURL}
                    controlsList="nodownload"
                  />
                </div>
              </Col>
            </Row>
          </Container>
          <Container id="finalTranscriptContainer">
            <div id="interimTranscript"></div>
            <div
              id="finalTranscript"
              value={this.state.sentence}
              onChange={this.handleInputChange}
            >
              <br />
            </div>
          </Container>
          <Container id="buttonContainer">
            <Row id="buttonRow">
              <Col>
                <Button id="recordButton" onClick={this.toggleListen}>
                  <i id="favIcon" className="far fa-stop-circle"></i>
                </Button>
              </Col>
              <Col>
                <Button id="resetButton" onClick={this.resetTranscripts}>
                  <i id="favIcon" className="fas fa-undo"></i>
                </Button>
              </Col>
              <Col>
                <Button id="submitButton" onClick={this.submitTranscripts}>
                  <i id="favIcon" className="far fa-thumbs-up"></i>
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Dictaphone;
