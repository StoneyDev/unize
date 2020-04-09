import React, {useEffect, useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import { RefreshCw, Zap } from "react-feather";
import Quagga from '@ericblade/quagga2';

const Scanner = () => {
  let history = useHistory()
  const [ videoInit, setVideoInit ] = useState(false);
  const [ videoError, setVideoError ] = useState(false);

  const onInitSuccess = () => {
    Quagga.start();
    setVideoInit(true);
  };

  const onDetected = (result) => {
    const regex = /_/g;
    const regexFormat = (result.codeResult.format).replace(regex, '');

    Quagga.offDetected(onDetected);

    let existing = localStorage.getItem('list');
    existing = existing ? JSON.parse(existing) : [];

    const data = {
      "id": result.codeResult.code,
      "format": regexFormat,
      "company": "Carrefour"
    };

    existing.push(data);
    localStorage.setItem('list', JSON.stringify(existing));

    Quagga.stop();
    history.push("/");
  };

  // const toggleTorch = () => {
  //   const torch = !this.state.torch;
  //   this.setState({ torch });
  //   const track = Quagga.CameraAccess.getActiveTrack();
  //   if (track && typeof track.getCapabilities === 'function') {
  //     track.applyConstraints({ advanced: [ { torch } ] });
  //   }
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
        numOfWorkers: 1,
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
    }
  }, []);

  return (
    <div>
      <div className="Scanner--container">
        <div className="Scanner--switchCamera">
          <RefreshCw />
        </div>
        {videoError ?
          <div>
            <div>
              <h2>Nous ne trouvons pas votre appareil photo</h2>
              <p>Vérifier que cette dernière est bien connectée ou que les accès sont bien autorisés</p>
            </div>
          </div>
          :
          <div>
            <div className="Scanner--video" id="video" />
          </div>
        }
      </div>
    </div>
  );
}

export default Scanner;