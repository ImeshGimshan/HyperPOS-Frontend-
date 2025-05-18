const SummeryFooter = ({ cartItems, totalAmount }) => {
    const grandTotal = cartItems?.reduce((sum, item) => {
        const total = item?.unitCost * item?.quantity * (1 - (item?.discount || 0) / 100);
        return sum + (total > 0 ? total : 0);
    }, 0);

    return (
        <>
            <div className="my-4 w-full">
                <div className="flex justify-between text-lg font-semibold">
                    <span>GRN Return total:</span>
                    <span>Rs. {(grandTotal || 0)?.toFixed(2)}</span>
                </div>
            </div>
            <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-2">
                    <label className="text-purple-200">Original GRN Total:</label>
                    <input
                        type="number"
                        readOnly
                        value={Number(totalAmount || 0).toFixed(2)}
                        className="bg-[#0f0326]/80 border border-[#f472b6]/30 p-1 rounded-lg w-32 text-white text-center focus:outline-none"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-purple-200">Return Amount:</label>
                    <input
                        type="text"
                        readOnly
                        value={(grandTotal || 0)?.toFixed(2)}
                        className="bg-[#0f0326]/80 border border-[#f472b6]/30 p-1 rounded-lg w-32 text-white text-center focus:outline-none"
                    />
                </div>
            </div>
        </>
    );
};

export default SummeryFooter;
