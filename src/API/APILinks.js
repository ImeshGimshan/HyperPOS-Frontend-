// const BaseUrl = "https://152.67.176.77:8443/api";
// const BaseUrl = "http://localhost:8080/api";
const BaseUrl = "https://6d2b-152-67-176-77.ngrok-free.app/api";
const billUrl = "http://152.67.176.77:8080";

const APILinks = {
  login: `${BaseUrl}/auth/login`,
  register: `${BaseUrl}/auth/register`,
  forgotPassword: `${BaseUrl}/auth/forgetpassword`,

  getUser: `${BaseUrl}/user`,
  getUserById: (id) => `${BaseUrl}/user/${id}`,
  setActive: (id, isActive) =>
    `${BaseUrl}/user/status/${id}?isActive=${isActive}`,
  setRole: (id, role) => `${BaseUrl}/user/role/${id}?role=${role}`,

  getCustomers: `${BaseUrl}/customer`,
  getCustomerById: (id) => `${BaseUrl}/customer/${id}`,
  saveCustomer: `${BaseUrl}/customer`,
  updateCustomer: (id) => `${BaseUrl}/customer/${id}`,

  getCategories: `${BaseUrl}/category`,
  getCategoryById: (id) => `${BaseUrl}/category/${id}`,
  saveCategory: `${BaseUrl}/category`,
  updateCategory: (id) => `${BaseUrl}/category/${id}`,
  deleteCategory: (id) => `${BaseUrl}/category/${id}`,

  getProducts: `${BaseUrl}/product`,
  getProductById: (id) => `${BaseUrl}/product/${id}`,
  saveProduct: `${BaseUrl}/product`,
  saveProductWithImage: `${BaseUrl}/product`,
  updateProduct: (id) => `${BaseUrl}/product/${id}`,
  updateProductWithImage: (id) => `${BaseUrl}/product/${id}`,
  getProductStock: `${BaseUrl}/product/stock`,
  getProductStockById: (id) => `${BaseUrl}/product/stock/${id}`,
  getProductImage: (id) => `${BaseUrl}/image/product/${id}`,

  getInvoices: `${BaseUrl}/invoice`,
  getInvoiceById: (id) => `${BaseUrl}/invoice/${id}`,
  saveInvoice: `${BaseUrl}/invoice`,
  updateInvoice: (id) => `${BaseUrl}/invoice/${id}`,
  getInvoiceItemById: (id) => `${BaseUrl}/invoice/item/${id}`,
  saveInvoiceItem: `${BaseUrl}/invoice/item`,

  getGRNs: `${BaseUrl}/grn`,
  getGRNById: (id) => `${BaseUrl}/grn/${id}`,
  saveGRN: `${BaseUrl}/grn`,
  updateGRN: (id) => `${BaseUrl}/grn/${id}`,
  getGRNItemById: (id) => `${BaseUrl}/grn/item/${id}`,
  saveGRNItem: `${BaseUrl}/grn/item`,

  getSales: `${BaseUrl}/sale`,
  saveSale: `${BaseUrl}/sale`,
  getSaleById: (id) => `${BaseUrl}/sale/${id}`,
  returnSale: (id) => `${BaseUrl}/sale/${id}`,

  getPurchases: `${BaseUrl}/purchase`,
  savePurchase: `${BaseUrl}/purchase`,
  returnPurchase: (id) => `${BaseUrl}/purchase/${id}`,
  getPurchaseById: (id) => `${BaseUrl}/purchase/${id}`,

  saveProductImage: (id) => `${BaseUrl}/image/product/${id}`,

  getSuppliers: `${BaseUrl}/supplier`,
  getSupplierById: (id) => `${BaseUrl}/supplier/${id}`,
  saveSupplier: `${BaseUrl}/supplier`,
  updateSupplier: (id) => `${BaseUrl}/supplier/${id}`,

  getOrg: `${BaseUrl}/org`,
  updateOrg: `${BaseUrl}/org`,
};

export default APILinks;
export { BaseUrl, APILinks, billUrl };
