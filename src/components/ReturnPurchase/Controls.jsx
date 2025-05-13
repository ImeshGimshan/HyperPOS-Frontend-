import React from 'react';

const Controls = ({ clear, onSubmitGRN}) => (
    <div>
        <button onClick={clear} className="bg-blue-700">
            Clear
        </button>
        <button onClick={()=> onSubmitGRN()} className="bg-green-700 px-4 py-2 cursor-pointer hover-bg-green-800 rounded">
            Submit
        </button>
    </div>
);
export default Controls;