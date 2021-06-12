import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import './ScrollToTop.css';

const ScrollToTop = () => {

  const [showButton, setShowButton] = useState(false);

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};

  const scrollFunction = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      if(showButton === false) setShowButton(true);
    } else {
      if(showButton === true) setShowButton(false);
    }
  }

  const scrollToTopHandler = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  return (
    <CSSTransition in={showButton} unmountOnExit timeout={500} classNames="scrolltop-animate">
      <div id="scrollToTopButton" onClick={scrollToTopHandler}>
        {/* <img src="./images/plus1.png" alt="Scroll to top button."></img> */}
        <img src="./images/plus1_3.png" alt="Scroll to top button."></img>
      </div>
    </CSSTransition>
  )
}

export default ScrollToTop;
