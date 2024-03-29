import React from 'react';

import './Footer.css';
import FanContentPolicy from './FanContentPolicy';

const Footer = () => {
    return (
        <>
            <FanContentPolicy />
            <div id="footer">
                <div><i className="far fa-copyright"></i> 2020 John Kearney</div>
                <div>johnkearneydev@gmail.com</div>
                <div id="contactIconsContainer">
                    <a className="contactIcons" href="https://github.com/JohnKearney2020/mtgReactReduxProject" target="_blank" rel="noopener noreferrer"><i className="fab fa-github-square"></i></a>
                    <a className="contactIcons" href="https://www.linkedin.com/in/johnkearneydev/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                </div>
            </div>
        </>
    )
}

export default Footer
