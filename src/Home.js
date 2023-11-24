/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import bodyImg from './assets/images/body2.png';
import visemeJson from './constants';
import english from './english.wav'

function Home(props) {
  const canvasRef = useRef();
  const ctx = useRef();

  let imageCache = new Map();
  let TRANSITION_DELAY = 60;
  let ttsAudio;

  // function loadImage(imageId) {
  //   return new Promise(resolve => {
  //     const image = document.getElementById(imageId);
  //     if (image.complete) {
  //       return resolve(image);
  //     }

  //     image.onload = () => {
  //       resolve(image);
  //     };
  //   });
  // }

  function loadImageBySrc(imageUrl) {
    if (imageCache.has(imageUrl)) {
      return Promise.resolve(imageCache.get(imageUrl));
    }

    return new Promise(resolve => {
      const image = new Image();
      image.onload = () => {
        imageCache.set(imageUrl, image);
        resolve(image);
      };
      image.src = imageUrl;
    });
  }

  async function  drawMouthFrame(frameId) {
    console.log(frameId)
    const image = await loadImageBySrc(`./assets/mouth-v2/${frameId}.png`);
    ctx.current.fillStyle = `rgb(90, 81, 74)`;
    // ctx.current.fillRect(200, 165, 100, 75);
    ctx.current.drawImage(image, 0, 0);
  }

  async function playAudio(name) {
    if (ttsAudio) {
      ttsAudio.pause();
    }
    ttsAudio = new Audio(english);
    // const response = await fetch(new Request(`${name}.json`), {
    //   method: 'GET',
    //   mode: 'no-cors'
    // });
    const visemeData = visemeJson;
console.log(name)
console.log(visemeData)
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
      // ctx.current.drawImage(img, 0, 0);
      // ctx.current.font = '40px Courier';
      // ctx.current.fillText(props.text, 410, 475);
      ctx.fillStyle = `rgb(90, 81, 74)`;
      // ctx.current.fillRect(200, 165, 100, 75);
      ctx.current.drawImage(img, 0, 0);
    };
  }, [props.text]);

  return (
    <div>
      <div className="App" style={{ height: '100%', width: '100%' }}>
        <span>sampath</span>
        <canvas ref={canvasRef}></canvas>
        <button onClick={() => playAudio('english')}>Click me</button>
      </div>
    </div>
  );
}

export default Home;
