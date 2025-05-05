
const invoiceData = [

  {
    "invoice": {
        "id": 1,
        "customerId": 1,
        "total": 5700.0,
        "date": "2025-03-15T14:23:45Z"
    },
    "items": [
        {
            "id": 1,
            "invoiceId": 1,
            "productId": 1,
            "quantity": 110.0,
            "unitPrice": 50,
            "discount": 0,
            "costPrice": 42.0,
            "amount": 5500
        },
        {
            "id": 2,
            "invoiceId": 1,
            "productId": 1,
            "quantity": 10.0,
            "unitPrice": 120,
            "discount": 0,
            "costPrice": 100,
            "amount": 1200
        }
    ]
  },
  {
      "invoice": {
          "id": 2,
          "customerId": 1,
          "total": 6700.0,
          "date": "2025-07-22T09:45:12Z"
      },
      "items": [
          {
              "id": 2,
              "invoiceId": 2,
              "productId": 1,
              "quantity": 110.0,
              "unitPrice": 50,
              "discount": 0,
              "costPrice": 42.0,
              "amount": 5500
          },
          {
              "id": 3,
              "invoiceId": 2,
              "productId": 1,
              "quantity": 10.0,
              "unitPrice": 120,
              "discount": 0,
              "costPrice": 100,
              "amount": 1200
          }
      ]
  },
  {
      "invoice": {
          "id": 3,
          "customerId": 1,
          "total": 10700.0,
          "date": "2025-11-05T16:34:23Z"
      },
      "items": [
          {
              "id": 4,
              "invoiceId": 3,
              "productId": 1,
              "quantity": 110.0,
              "unitPrice": 50,
              "discount": 0,
              "costPrice": 42.0,
              "amount": 5500
          },
          {
              "id": 5,
              "invoiceId": 3,
              "productId": 1,
              "quantity": 10.0,
              "unitPrice": 120,
              "discount": 0,
              "costPrice": 100,
              "amount": 1200
          }
      ]
  },
  {
      "invoice": {
          "id": 4,
          "customerId": 1,
          "total": 6700.0,
          "date": "2025-04-18T11:56:34Z"
      },
      "items": [
          {
              "id": 6,
              "invoiceId": 4,
              "productId": 1,
              "quantity": 110.0,
              "unitPrice": 50,
              "discount": 0,
              "costPrice": 42.0,
              "amount": 5500
          },
          {
              "id": 7,
              "invoiceId": 4,
              "productId": 1,
              "quantity": 10.0,
              "unitPrice": 120,
              "discount": 0,
              "costPrice": 100,
              "amount": 1200
          }
      ]
  },
  {
      "invoice": {
          "id": 5,
          "customerId": 1,
          "total": 9700.0,
          "date": "2025-09-30T08:12:56Z"
      },
      "items": [
          {
              "id": 8,
              "invoiceId": 5,
              "productId": 1,
              "quantity": 110.0,
              "unitPrice": 50,
              "discount": 0,
              "costPrice": 42.0,
              "amount": 5500
          },
          {
              "id": 9,
              "invoiceId": 5,
              "productId": 1,
              "quantity": 10.0,
              "unitPrice": 120,
              "discount": 0,
              "costPrice": 100,
              "amount": 1200
          }
      ]
  },
  {
      "invoice": {
          "id": 6,
          "customerId": 1,
          "total": 6700.0,
          "date": "2025-12-25T15:45:30Z" // create at
      },
      "items": [
          {
              "id": 10,
              "invoiceId": 6,
              "productId": 1,
              "quantity": 110.0,
              "unitPrice": 50,
              "discount": 0,
              "costPrice": 42.0,
              "amount": 5500
          },
          {
              "id": 11,
              "invoiceId": 6,
              "productId": 1,
              "quantity": 10.0,
              "unitPrice": 120,
              "discount": 0,
              "costPrice": 100,
              "amount": 1200
          }
      ]
  }

];
  
// for or map, new attribute grandtotal to the invoice. 
// avg sales per day, month, year.


// Expoting the invoiceData.
export default invoiceData;