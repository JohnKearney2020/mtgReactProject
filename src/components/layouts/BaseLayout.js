import React from 'react';
import Header from './Header';
// import moduleName from './components/layouts/Footer';

// import BackgroundImg from './BackgroundImg';
import './BaseLayout.css';

const BaseLayout = (props) => {
    return (
        <>
            <div id="backgroundImg">
            {/* <BackgroundImg /> */}
            <Header />
                {props.children}
            {/* <Footer /> */}
            </div>
        </>
    )
}

export default BaseLayout;