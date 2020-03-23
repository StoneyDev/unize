import React, { Component } from 'react';

class Scanner extends Component {

  constructor(props) {
    super(props);
    this.state = { cameraIndex: 0 };
    this.switchCamera = this.switchCamera.bind(this);
  }

  componentDidMount() {
    this.setupScanner();
  }

  setupScanner() {
    if (typeof window === 'undefined') {
      return;
    }

    const Zxing = require('@zxing/library');

    this.codeReader = new Zxing.BrowserBarcodeReader();
    this.codeReader.getVideoInputDevices()
      .then((cameras) => {
        if (!cameras || !cameras.length) {
          this.setState({
            camerasCount: cameras.length,
            error: true
          });
          return;
        } else {
          this.setState({
            camerasCount: cameras.length
          });
        }

        this.codeReader.decodeFromInputVideoDevice(
          cameras[this.state.cameraIndex].deviceId,
          this.refs.video
        )
          .then((result) => {
            this.onProductScanned(result.text);
          })
          .catch((err) => {
            console.warn(err);
          })
      })
      .catch((err) => {
        console.warn(err);
        this.setState({ error: true });
      })
  }

  onProductScanned(barCode) {
    // Router.push({
    //     pathname: '/Product',
    //     query: { barCode }
    // });
  }

  switchCamera() {
    this.setState({
      cameraIndex: this.state.cameraIndex === 0 ? 1 : 0
    }, () => {
      this.codeReader.reset();
      this.setupScanner();
    })

  }

  switchCameraButton() {
    return (
      <div
        className={'Scanner--switchCamera'}
        onClick={this.switchCamera}>
        <i className={'fas fa-sync'} />
      </div>
    )
  }

  render() {

    if (this.state.error) {
      return (
        <div className={'Scanner--container'}>
          <p>Erreur lors de l'initialisation de la camera</p>
        </div>
      );
    }

    return (
      <div className={'Scanner--container'}>
        {this.switchCameraButton()}
        <video ref={'video'} className={'Scanner--video'} />
      </div>
    );
  }
}

export default Scanner;
