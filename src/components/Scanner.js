import React, {useEffect, useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import { X, Zap, CameraOff } from "react-feather";
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
  let history = useHistory();
  const [ videoError, setVideoError ] = useState(false);
  const [ light, setLight] = useState(true);

  const onInitSuccess = () => {
    Quagga.start();
  };

  const onDetected = (result) => {
    const format = (result.codeResult.format).replace(/_/g, '');
    let existing = localStorage.getItem('list');
    existing = existing ? JSON.parse(existing) : [];

    // if Quagga is at least 90% certain that it read correctly, then accept the code.
    const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
    if (err < 0.1) {
      if (props.match.params[0]) {
        const search = existing.find(val => val.id === props.match.params.name);
        search.id = result.codeResult.code;
        search.format = format; // In case Quaggajs scans the wrong barcode.
      } else {
        const data = {
          "id": result.codeResult.code,
          "format": format,
          "name": props.match.params.name,
          "img": props.match.params.img ? props.match.params.img : 'default.svg'
        };
        existing.push(data);
      }

      localStorage.setItem('list', JSON.stringify(existing));

      Quagga.offDetected(onDetected);
      Quagga.stop();
      history.push("/");
    }
  };

  const toggleTorch = () => {
    // Bug ?: Can't switch off the flashlight when the flux is running
    // MDN: A Boolean defining whether the fill light is continuously connected, meaning it stays on as long as the track is active.
    setLight(!light);
    const track = Quagga.CameraAccess.getActiveTrack();
    if (track && typeof track.getCapabilities === 'function') {
      track.applyConstraints({ advanced: [ { torch: light } ] });
    }
  }

  useEffect(() => {
    window.onpopstate = () => {
      Quagga.stop();
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#video')
        },
        numOfWorkers: navigator.hardwareConcurrency,
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
    <div className="scanner">
      <div className="scanner__renderVideo">
        {videoError ?
          <CameraOff className="scanner__errorIcon" />
          :
          <div id="video" />
        }
      </div>
      <div className="scanner__message">
        <Link to="/" className="button__close">
          <X />
        </Link>

        {<button onClick={toggleTorch}>Torche</button>}

        {videoError ?
          <p>
            <strong>Impossible d’accèder à votre caméra !</strong>
          </p>
          :
          <p>
            <strong>Scanner votre carte fidélité</strong>
          </p>
        }
      </div>
    </div>
  );
}

export default Scanner;