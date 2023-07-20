import { Transition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";

function Fade({children}) {
  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);
  
const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

useEffect(() => {
    setTimeout(()=>setInProp(true), 300);
  }, [])

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

  return (
    <div>
        
      <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
        {(state) => (
          <div
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {children}
          </div>
        )}
      </Transition>
    </div>
  );
}

export default Fade;