import React from 'react';
import Header from './Header';
// import moduleName from './components/layouts/Footer';
// import Home from '../Home';

const BaseLayout = (props) => {
    return (
        <>
            <Header />
                {props.children}
                
            {/* <Footer /> */}
        </>
    )
}

export default BaseLayout;