import { useEffect, useRef, useState } from "react"

function ThumbStick() {

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
    width: "100px",
    height: "100px"
  }

  const [selected, setSelected] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0});
  const [currentPoint, setCurrentPoint] = useState({ x: 0, y: 0});
  const thumb = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    thumb.current.style.transform = `translate(${currentPoint.x}px, ${currentPoint.y}px)`;
  }, [currentPoint]);

  const handleTouchStart = (e) => {
    setSelected(true);

    setStartPoint({
      x: currentPoint.x,
      y: currentPoint.y
    })
  }

  const handleTouchEnd = (e) => {
    setSelected(false);

    setCurrentPoint({
      x: 0,
      y: 0
    })
  }

  const handleTouchMove = (e) => {
    if(selected) {
      // const x = e.changedTouches[0].pageX;
      // const y = e.changedTouches[0].pageY;

      setCurrentPoint({
        x: e.changedTouches[0].pageX - container.current.offsetLeft - 100,
        y: e.changedTouches[0].pageY - container.current.offsetTop - 100
      })

      // console.log(currentPoint);
    }
  }
  
  return (
    <>
    <div style={stickContainerStyle} ref={container}
      onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove}>
      <div style={backgroundStyle}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="70" fill="transparent" stroke="red" strokeWidth="5"/>
        </svg>
      </div>
      <div style={thumbStyle} ref={thumb}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="100"/>
        </svg>
      </div>
    </div>
    </>
  )
}

export default ThumbStick;