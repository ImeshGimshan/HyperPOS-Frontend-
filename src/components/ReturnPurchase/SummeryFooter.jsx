import React from 'react';

const SummeryFooter = ({ cartItems, totalAmount}) => {
    const grandTotal = cartItems?.reduce((sum, item)=> {
        const total = item?.unitPrice * item?.quantity * (1 - (item?.discount || 0) / 100);
        return sum + ( total > 0 ? total : 0);
    }, 0);

    return (
        <>
            <div className="my-4 w-full">
                <div className="flex justify-between text-lg font-semibold">
                    <span>GRN Return total:</span>
                    <span>Rs.{(grandTotal || 0)?.toFixed(2)}</span>
                </div>
            </div>
            <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-2">
                    <lable>
                        Original GRN Total:
                    </lable>
                    <input 
                        type="number"
                        readOnly
                        value={Number(totalAmount || 0).toFixed(2)}
                        className="bg-blue-600 p-1 rounded w-32 text-white"
                    /> 
                </div>
                <div className="flex items-center gap-2">
                    <lable>
                        Return Amount:
                    </lable>
                    <input
                        type="text"
                        readOnly
                        value={(grandTotal || 0)?.toFixed(2)}
                        className="bg-blue-600 p-1 rounded w-32 text-white"
                    />
                </div>
            </div>
        </>
    );
};

export default SummeryFooter;