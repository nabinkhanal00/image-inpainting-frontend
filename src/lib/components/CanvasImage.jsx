import React, { useRef, useEffect, useState } from 'react';

const CanvasImage = (props) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushStrokes, setBrushStrokes] = useState([]);
  const [currentStroke, setCurrentStroke] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  if (props.file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setBackgroundImage(e.target.result)
    }
    reader.readAsDataURL(props.file)
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the image as background
      };
    }

    const startDrawing = (event) => {
      setIsDrawing(true);

      const rect = canvas.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top; setCurrentStroke([{ x: offsetX, y: offsetY }]);
    };

    const draw = (event) => {
      if (!isDrawing) return;


      const rect = canvas.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top; setCurrentStroke((prevStroke) => [...prevStroke, { x: offsetX, y: offsetY }]);

      const updatedBrushStrokes = [...brushStrokes];
      updatedBrushStrokes[updatedBrushStrokes.length - 1] = [...currentStroke, { x: offsetX, y: offsetY }];
      setBrushStrokes(updatedBrushStrokes);
    };

    const endDrawing = () => {
      setIsDrawing(false);
      setBrushStrokes((prevStrokes) => [...prevStrokes, currentStroke]);
      setCurrentStroke([]);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mouseout', endDrawing);

    return () => {
      // Cleanup event listeners on unmount
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', endDrawing);
      canvas.removeEventListener('mouseout', endDrawing);
    };
  }, [backgroundImage, isDrawing, currentStroke]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Redraw the background image and brush strokes
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the image as background
        brushStrokes.forEach((stroke) => {
          ctx.beginPath();


          ctx.strokeStyle = '#ffffff'; // Set stroke color to white
          ctx.lineWidth = 8;
          stroke.forEach((point, index) => {
            if (index === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          });
          ctx.stroke();
        });
      };
    }
  }, [backgroundImage, brushStrokes]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.download = 'drawn_image.png';
    downloadLink.click();
  };

  return (
    <div>
      <canvas ref={canvasRef} {...props} style={{ border: '1px solid black' }} />
      <br />
      <button onClick={handleDownload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Inpaint</button>
    </div>
  );
};

export default CanvasImage;
