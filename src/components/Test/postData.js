
const cart = {

  invoice : {

    id : 1,
    customerId : 1,
    total : 300.0,
    paymentMethod : "CASH",

  },

  items : [

    {
      invoiceId : 1,
      productId : 1,
      quantity : 1,
      unitPrice : 20,
      discount : 2,
      costPrice : 15,
      amount : 19.6,
    },

  ],

};

const updateCart = {

  invoice : {

    id : 1,
    customerId : 1,
    total : 300.0,
    paymentMethod : "CASH",

  },

  items : [

    {
      id : 16,
      invoiceId : 1,
      productId : 1,
      quantity : 1,
      unitPrice : 20,
      discount : 2,
      costPrice : 15,
      amount : 19.6,
    },

  ],

};

const product = {

  barcode : "4fsidfdfsf",
  name : "phone 15",
  categoryId : 1,
  unit : "PIECE",
  description : "some description",
  image : null,
  discount : 5,
  price : 100000.0,
  isActive : true,

};

const updatedProduct = {

  id : 6,
  barcode : "4fsdfsdfdfsf",
  name : "Iphone 14",
  categoryId : 1,
  unit : "PIECE",
  description : "this is a phone",
  image : null,
  discount : 10,
  price : 100000.0,
  isActive : true,

};

export { cart , updateCart , product , updatedProduct };