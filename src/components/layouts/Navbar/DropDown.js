import React from 'react';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

// let { Multiselect } = ReactWidgets;
// let colors = ['orange', 'red', 'blue', 'purple']
let colors = [`Double Masters`, `Theros - Beyond Death` ]

const DropDown = () => {
    return (
        <>
            <Multiselect
                data={colors}
                // defaultValue={["orange", "blue"]}
                // disabled={["red", "purple"]}
            />
        </>
    )
}

export default DropDown;






// let example = (
//   <>
//     <Multiselect
//       data={colors}
//       defaultValue={["orange", "blue"]}
//       disabled={["red", "purple"]}
//     />
//   </>
// )

// render(example);