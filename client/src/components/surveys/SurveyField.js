// logic to render a single label and text input ... use props for customizing
import React from 'react';

//props.input destructuring and meta nested destructuring
export default ({ input, label, meta: { error, touched} }) => {

    // console.log(props.input);
    // console.log(meta);

    return (
        <div>
            <label>{label}</label>
            <input { ...input} />
            {/* spread operator-- above is equal to:  */}
            {/* <input onBlur={input.onBlur} etc etc/> */}
            {touched && error}
        </div>
    );
};