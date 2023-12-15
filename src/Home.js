/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import bodyImg from './assets/images/body.png';
import visemeJson from './constants';
import english from './english.wav'

function Home(props) {
  const canvasRef = useRef();
  const ctx = useRef();
  let TRANSITION_DELAY = 60;
  let ttsAudio;

  async function  drawMouthFrame(frameId) {
    const image = new Image();
    image.src = require((`./assets/images/mouth-${frameId}.png`));

    image.onload = () => {
      ctx.fillStyle = `rgb(90, 81, 74)`;
      ctx.current.drawImage(image, 0, 0);
    };
  }

  async function playAudio() {
    if (ttsAudio) {
      ttsAudio.pause();
    }
    ttsAudio = new Audio(english);
    const visemeData = visemeJson;
    ttsAudio.ontimeupdate = (event) => {
      const currentFrame = visemeData.find(frameData => {
        return frameData.offset - (TRANSITION_DELAY / 2) >= ttsAudio.currentTime * 1000;
      });
      drawMouthFrame(currentFrame?.id ?? 0);
    };
    ttsAudio.play();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 512;

    const img = new Image();
    img.src = bodyImg;
    img.onload = () => {
      ctx.fillStyle = `rgb(90, 81, 74)`;
      ctx.current.drawImage(img, 0, 0);
    };
  }, []);

  return (
    <div>
      <div className="App" style={{ height: '100%', width: '100%' }}>
        <canvas ref={canvasRef}></canvas>
        <button onClick={() => playAudio()}>Play</button>
      </div>
    </div>
  );
}

export default Home;
