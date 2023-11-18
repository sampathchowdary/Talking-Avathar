

/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useEffect, useRef } from 'react';
import bodyImg from './assets/images/body.png'

function Home(props) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = bodyImg;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.font = "40px Courier";
      ctx.fillText(props.text, 210, 175);
    };
  }, [props.text]);

  return (
    <div>
      <div className="App">
        <span>sampath</span>
        <canvas ref={canvasRef}></canvas>
        {/* <img src={img} alt='ima'></img> */}
      </div>
    </div>
  );
}

export default Home;



    // function loadImage(imageId) {
    //     return new Promise(resolve => {
    //         const image = document.getElementById(imageId);
    //         if (image.complete) {
    //             return resolve(image);
    //         }
    
    //         image.onload = () => {
    //             resolve(image);
    //         };
    //     });
    // }

    // const imageCache = new Map();
    // function loadImageBySrc(imageUrl) {
    //     if (imageCache.has(imageUrl)) {
    //         return Promise.resolve(imageCache.get(imageUrl))
    //     }

    //     return new Promise(resolve => {
    //         const image = new Image();
    //         image.onload = () => {
    //             imageCache.set(imageUrl, image);
    //             resolve(image);
    //         };
    //         image.src = imageUrl;
    //     });
    // }

    // async function drawImage(imageId) {
    //     const image = await loadImage(imageId);
    //     ctx.drawImage(image, 0, 0);
    // }

    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    // function clearEyes() {
    //     ctx.fillStyle = "rgb(90, 81, 74)";
    //     ctx.fillRect(167, 156, 40, 44);
    //     ctx.fillRect(293, 156, 40, 44);
    // }
    // async function eyeBlink() {
    //     const leftEye = await loadImage("eye-l");
    //     const rightEye = await loadImage("eye-r");

    //     const targetHeight = Math.floor(leftEye.height * 0.2);
    //     let height = leftEye.height;
    //     const ANIMATION_STEP = 20;

    //     while (height > targetHeight) {
    //         await sleep(ANIMATION_STEP);
    //         height *= 0.8;
    //         clearEyes();
    //         ctx.drawImage(leftEye, 0, (leftEye.height - height) / 3, leftEye.width, height);
    //         ctx.drawImage(rightEye, 0, (rightEye.height - height) / 3, rightEye.width, height);
    //     }

    //     await sleep(ANIMATION_STEP);
    //     clearEyes();
    //     ctx.drawImage(leftEye, 0, (leftEye.height - targetHeight) / 3, leftEye.width, targetHeight);
    //     ctx.drawImage(rightEye, 0, (rightEye.height - targetHeight) / 3, rightEye.width, targetHeight);

    //     await sleep(75);
    //     clearEyes();
    //     await drawImage("eye-l-closed");
    //     await drawImage("eye-r-closed");

    //     await sleep(120);
    //     clearEyes();
    //     await drawImage("eye-l");
    //     await drawImage("eye-r");
    // }

    // document.addEventListener("DOMContentLoaded", async function() {
    //     canvas = document.getElementById("canvas");
    //     console.log('sam')
    //     canvas.width = 512;
    //     canvas.height = 512;
    
    //     ctx = canvas.getContext("2d");
    
    //     await drawImage("body");
    //     await drawImage("eye-l");
    //     await drawImage("eye-r");
    //     const image = await loadImageBySrc('./assets/images/mouth-0.png');
    //     ctx.drawImage(image, 0, 0);
    
    //     eyeBlink();
    //     const BLINK_INTERVAL = 3500;
    //     setInterval(() => {
    //         eyeBlink();
    //     }, BLINK_INTERVAL);
    // });
