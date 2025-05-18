const SummeryFooter = ({ cartItems, totalAmount }) => {
    const grandTotal = cartItems?.reduce((sum, item) => {
        const total = item?.unitCost * item?.quantity * (1 - (item?.discount || 0) / 100);
        return sum + (total > 0 ? total : 0);
    }, 0);

    return (
        <>
            <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-2 w-full">
                <div className="flex-1 flex items-center gap-2 min-w-[200px]">
                    <label className="text-purple-200">Original GRN Total:</label>
                    <input
                    type="number"
                    readOnly
                    value={Number(totalAmount || 0).toFixed(2)}
                    className="bg-[#0f0326]/80 border border-[#f472b6]/30 p-1 rounded-lg w-full max-w-[150px] text-white text-center focus:outline-none"
                    />
                </div>
                <div className="flex-1 flex items-center gap-2 min-w-[200px]">
                    <label className="text-purple-200">Return Amount:</label>
                    <input
                    type="text"
                    readOnly
                    value={(grandTotal || 0)?.toFixed(2)}
                    className="bg-[#0f0326]/80 border border-[#f472b6]/30 p-1 rounded-lg w-full max-w-[150px] text-white text-center focus:outline-none"
                    />
                </div>
            </div>
        </>
    );
};

export default SummeryFooter;
