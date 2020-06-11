// logic to render a single label and text input ... use props for customizing
import React from 'react';

//props.input destructuring
export default ({ input, label }) => {

    // console.log(props.input);

    return (
        <div>
            <label>{label}</label>
            <input { ...input} />
            {/* above is equal to:  */}
            {/* <input onBlur={input.onBlur} etc etc/> */}
        </div>
    );
};