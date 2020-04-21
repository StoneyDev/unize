import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { RefreshCw, Zap, CameraOff } from "react-feather";
import Quagga from '@ericblade/quagga2';

function getMedian(arr) {
  arr.sort((a, b) => a - b);
  const half = Math.floor(arr.length / 2);
  if (arr.length % 2 === 1) {
    return arr[half];
  }
  return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes) {
  const errors = decodedCodes.filter(x => x.error !== undefined).map(x => x.error);
  return getMedian(errors);
}

const Scanner = (props) => {
  let history = useHistory()
  const [ videoError, setVideoError ] = useState(false);

  const onInitSuccess = () => {
    Quagga.start();
  };

  const onDetected = (result) => {
    const format = (result.codeResult.format).replace(/_/g, '');
    let existing = localStorage.getItem('list');
    existing = existing ? JSON.parse(existing) : [];

    // if Quagga is at least 85% certain that it read correctly, then accept the code.
    const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
    if (err < 0.15) {
      const data = {
        "id": result.codeResult.code,
        "format": format,
        "shop": props.match.params.name,
        "img": props.match.params.img ? props.match.params.img : 'default.svg'
      };
      existing.push(data);
      localStorage.setItem('list', JSON.stringify(existing));

      Quagga.offDetected(onDetected);
      Quagga.stop();
      history.push("/");
    }
  };

  // const toggleTorch = () => {
  //   const torch = !this.state.torch;
  //   this.setState({ torch });
  //   const track = Quagga.CameraAccess.getActiveTrack();
  //   if (track && typeof track.getCapabilities === 'function') {
  //     track.applyConstraints({ advanced: [ { torch } ] });
  //   }
  // }

  // function check() {
  //   navigator.mediaDevices.getUserMedia({
  //     video: true
  //   },)
  //     .then(() => {
  //       return true;
  //     })
  //     .catch(() => {
  //       return false;
  //     });
  // }

  useEffect(() => {
    window.onpopstate  = (e) => {
      Quagga.stop();
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#video')
        },
        numOfWorkers: 2,
        locate: true,
        decoder : {
          readers : ['ean_reader', 'code_128_reader']
        }
      }, (err) => {
        if (err) {
          setVideoError(true);
          return;
        }
        onInitSuccess();
      });
      Quagga.onDetected(onDetected);
    } else {
      setVideoError(true);
    }
  }, []);

  return (
    <div className="h-100">
      <div className="Scanner--switchCamera">
        <RefreshCw />
      </div>
      <div className="Scanner--container">
        {videoError ?
          <div>
            <CameraOff className="Scanner--errorIcon" />
          </div>
          :
          <div className="Scanner--video" id="video" />
        }
      </div>
      <div className="Scanner--message">
        {videoError ?
          <h3>Impossible d’accèder à votre caméra !</h3>
          :
          <h3>Scanner votre carte fidélité</h3>
        }
      </div>
    </div>
  );
}

export default Scanner;