import { useState, useEffect } from 'react';
import Header from './Header'
import CartTable from './CartTable';
import Controls from './Controls';
import SummeryFooter from './SummeryFooter';
import { getPurchases, getPurchaseById, savePurchase, returnPurchase } from '../../API/APIPurchase';
import {getProducts} from '../../API/APIProducts';
import GRNPreview from './GRNPreview';

function GrnReturn() {
    const [grnData, setGRNData] = useState({});
    const [printGRN, setPrintGRN] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [remarks, setRemarks] = useState("");
    const [productList, setProductList] = useState([]);

    useEffect(()=> {
        const getAllProducts = async () => {
            try {
                const response = await getProducts();
                setProductList(response);
            }
            catch (error){
                const errorMessage = error.response?.data?.message || "An error occurred";
                alert("Error: "+ errorMessage);
                console.error("Error fetching products: ", error);
            }
        };
        getAllProducts();
    },[]);

    useEffect(() => {
        setCartItems(grnData?.items);
        setTotalAmount(grnData?.grn?.total || 0);
    }, [grnData]);

    const selectGRN = async (id) => {
        console.log("GRN ID: ", id);
        try {
            const response = await getPurchaseById(id);
            setGRNData(response);
            console.log("GRN Data: ", response);
        }
        catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            alert("GRN not found: "+ errorMessage);
            console.error("Error fetching GRN: ", error);
            setGRNData({});
        }
    };

    const handleSubmitGRN = async () => {
        if(cartItems.length === 0){
            alert("Please select at least one item to return");
            return;
        }
        try{
            const grnForSubmit = setGRNForSubmit(grnData?.grn, cartItems);
            console.log("GRN for submit: ", grnForSubmit);
            const response = await returnPurchase(grnForSubmit.grn.id, grnForSubmit);
            setPrintGRN(response);
            alert("GRN return submitted successfully");
        }
        catch (error){
            const errorMessage = error.response?.data?.message || "Something went wrong";
            alert(errorMessage);
            console.error("Error submitting GRN return: ", error);
        }
    };

    const handleQuantityChange = (id, quantity) => {
        setCartItems((prev) => 
            prev.map((item) =>
                item.id === id ? { ...item,
                    quantity: parseInt(quantity),
                    amount:
                        parseInt(quantity) * (item.unitCost * (1 - item.discount / 100))
                        || 0,
                 }
                 : item
            )
        );
    };

    const setGRNForSubmit = (grn , items) => {
        const newGRN = {
            grn: {
                id: grn?.id,
                supplierId: grn?.supplierId,
                total: items?.reduce((sum, item) => sum + item.amount, 0),
                remarks: remarks,
            },
            items: items,
        };
        return newGRN;
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 w-full grn-app">
            <div className="max-w-screen-xl mx-auto grn-container">
                <h1 className="text-2xl font-bold text-center mb-4">Return GRN</h1>
                <Header grn={grnData?.grn} selectGRN={selectGRN} />

                {printGRN && <GRNPreview grn={printGRN} productList={productList} close={() => setPrintGRN(null)} />}

                <CartTable
                    cartItems={cartItems}
                    productList={productList}
                    onQuantityChange={handleQuantityChange}
                />

                <div className="w-full my-4">
                    <lable className="block m-2">Remarks:</lable>
                    <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded"
                        rows="3"
                        placeholder="Enter any notes or remarks here"
                    />
                </div>
                <SummeryFooter
                    cartItems={cartItems}
                    totalAmount={totalAmount}
                />
                <Controls
                    clear={()=> {
                        setGRNData({});
                        setRemarks("");
                    }}
                    onSubmitGRN={handleSubmitGRN}
                />
            </div>
        </div>
    );
}
export default GrnReturn