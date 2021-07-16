import Quagga from '@ericblade/quagga2';
import React, { useCallback, useEffect, useState } from 'react';
import { CameraOff, X, Zap } from 'react-feather';
import { Link, useHistory, useLocation } from 'react-router-dom';

function getMedian(arr) {
  arr.sort((a, b) => a - b);
  const half = Math.floor(arr.length / 2);
  if (arr.length % 2 === 1) {
    return arr[half];
  }
  return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes) {
  const errors = decodedCodes.filter((x) => x.error !== undefined).map((x) => x.error);
  return getMedian(errors);
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Scanner = () => {
  const history = useHistory();
  const query = useQuery();
  const [videoError, setVideoError] = useState(false);
  const [flashlight, setFlashlight] = useState(true);

  const onInitSuccess = () => {
    Quagga.start();
  };

  const onDetected = useCallback(
    (result) => {
      const format = result.codeResult.format.replace(/_/g, '');
      let existing = localStorage.getItem('listShopCard');
      existing = existing ? JSON.parse(existing) : [];

      // if Quagga is at least 90% certain that it read correctly, then accept the code.
      const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
      if (err < 0.1) {
        if (!query.get('edit')) {
          // add
          const data = {
            id: result.codeResult.code,
            format,
            name: query.get('name'),
            img: query.get('img'),
          };
          existing.push(data);
        } else {
          // update
          const search = existing.find((val) => val.id === query.get('id'));
          search.id = result.codeResult.code;
          search.format = format; // In case Quaggajs scans the wrong barcode.
        }
        localStorage.setItem('listShopCard', JSON.stringify(existing));

        Quagga.offDetected(onDetected);
        Quagga.stop();
        history.push('/');
      }
    },
    [history, query]
  );

  const close = useCallback(() => {
    Quagga.offDetected(onDetected);
    Quagga.stop();
  }, [onDetected]);

  const toggleFlashlight = () => {
    // Bug ?: Can't switch off the flashlight when the flux is running
    // MDN: A Boolean defining whether the fill light is continuously connected, meaning it stays on as long as the track is active.
    setFlashlight(!flashlight);
    const track = Quagga.CameraAccess.getActiveTrack();
    if (track && typeof track.getCapabilities === 'function') {
      track.applyConstraints({ advanced: [{ torch: flashlight }] });
    }
  };

  useEffect(() => {
    window.onpopstate = () => {
      close();
    };
  }, [close]);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.permissions.query({ name: 'camera' }).then((res) => {
        if (res.state === 'granted') {
          Quagga.init(
            {
              inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: document.querySelector('#video'),
              },
              numOfWorkers: navigator.hardwareConcurrency,
              locate: true,
              decoder: {
                readers: ['ean_reader', 'code_128_reader'],
              },
            },
            (err) => {
              if (err) {
                setVideoError(true);
                return;
              }
              onInitSuccess();
            }
          );
          Quagga.onDetected(onDetected);
        } else {
          setVideoError(true);
        }
      });
    }
  }, [onDetected]);

  return (
    <div className="bg-light-grey">
      <div className="scanner">
        <div className="scanner__renderVideo">
          {videoError ? (
            <CameraOff className="scanner__error" />
          ) : (
            <div>
              <button type="button" onClick={toggleFlashlight} className="scanner__torch">
                <Zap size="28" />
              </button>
              <div id="video" />
            </div>
          )}
        </div>
        <div className="scanner__message">
          <Link to="/" onClick={close} className="button__close">
            <X />
          </Link>
          {videoError ? (
            <p className="mb-0 mt-2">
              <strong>Impossible d’accèder à votre caméra !</strong>
            </p>
          ) : (
            <p className="mb-0 mt-2">
              <strong>Scannez le code-barres de votre carte</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scanner;
