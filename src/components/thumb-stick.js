import { useEffect, useRef, useState } from "react"

function ThumbStick() {
  const THUMB_SIZE = 100;
  const R = 100;
  const [pressed, setPressed] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0});
  const [currentPoint, setCurrentPoint] = useState({ x: 0, y: 0});
  const thumb = useRef(null);
  const container = useRef(null);
  const requestRef = useRef();

  const stickContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    margin: "0 auto",
    width: "200px",
    height: "200px"
  }

  const backgroundStyle = {
    position: "absolute",
    width: "200px",
    height: "200px",
    top: 0,
    left: 0
  }

  const thumbStyle = {
    display: "block",
    margin: "0 auto",
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    transform: `translate(${currentPoint.x}px, ${currentPoint.y}px)`
  }

  const animate = () => {
    if(pressed) {
      const magnitude = Math.sqrt(currentPoint.x * currentPoint.x + currentPoint.y * currentPoint.y);
      const dir = {
        x: currentPoint.x / magnitude,
        y: currentPoint.y / magnitude
      }

      if(magnitude) {
        console.log(dir);
        // [TODO] send this to scene
      }
    }

    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  });

  const handleTouchStart = (e) => {
    setPressed(true);

    setStartPoint({
      x: currentPoint.x,
      y: currentPoint.y
    })
  }

  const handleTouchEnd = (e) => {
    setPressed(false);

    setCurrentPoint({
      x: 0,
      y: 0
    })
  }

  const handleTouchMove = (e) => {
    if(pressed) {
      const x = e.changedTouches[0].pageX - container.current.offsetLeft - 100;
      const y = e.changedTouches[0].pageY - container.current.offsetTop - 100;

      // console.log(R, x, y, Math.sqrt(x * x + y * y))

      // if(R > Math.sqrt(x * x + y * y)) {
        setCurrentPoint({
          x: x,
          y: y
        })
      // }
    }
  }
  
  return (
    <>
    <div style={stickContainerStyle} ref={container}
      onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove}>
      <div style={backgroundStyle}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx={THUMB_SIZE} cy={THUMB_SIZE} r="70" fill="transparent" stroke="red" strokeWidth="5"/>
        </svg>
      </div>
      <div style={thumbStyle} ref={thumb}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx={THUMB_SIZE} cy={THUMB_SIZE} r={THUMB_SIZE}/>
        </svg>
      </div>
    </div>
    </>
  )
}

export default ThumbStick;