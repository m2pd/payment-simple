let isSuccessDeposit = false;
const products = [
  {
    image:
      'https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    name: 'Pepsi',
    price: 6000,
    codeproduct: 'PepsiVN',
  },
  {
    image:
      'https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    name: 'Cocacola',
    price: 6500,
    codeproduct: 'CocacolaVN',
  },
  {
    image:
      'https://images.unsplash.com/photo-1651950537598-373e4358d320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    name: 'Fanta',
    price: 6999,
    codeproduct: 'FantaVN',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const rootProductCard = document.querySelector('#product-card');
  let htmlProdcut = '';
  products.forEach(
    (product) =>
      (htmlProdcut += `
   <div
   class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
 >
   <img
     src=${product.image}
     alt="Product"
     class="h-80 w-72 object-cover rounded-t-xl"
   />
   <div class="px-4 py-3 w-72">
     <span class="text-gray-400 mr-3 uppercase text-xs">Brand</span>
     <p class="text-lg font-bold text-black truncate block capitalize">
       ${product.name}
     </p>
     <div class="flex items-center">
       <p class="text-lg font-semibold text-black cursor-auto my-3">
         ${product.price}
       </p>
       <del>
         <p class="text-sm text-gray-600 cursor-auto ml-2">50000</p>
       </del>
       <div class="ml-auto button-payment">
         <svg
           xmlns="http://www.w3.org/2000/svg"
           width="20"
           height="20"
           fill="currentColor"
           class="bi bi-bag-plus"
           viewBox="0 0 16 16"
         >
           <path
             fill-rule="evenodd"
             d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
           />
           <path
             d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
           />
         </svg>
       </div>
     </div>
   </div>
 </div>
   
   `)
  );

  rootProductCard.innerHTML = htmlProdcut;
  const btnPayments = document.querySelectorAll('.button-payment');

  btnPayments.forEach((btnPay, index) => {
    const currentButton = btnPay;

    currentButton.addEventListener('click', async () => {
      const productInfo = products[index];
      const userID = 'PhuongDoan';
      const productInfoPrice = productInfo.price;
      const productInfoCode = productInfo.codeproduct;
      const QRBankLink = `https://img.vietqr.io/image/MBBank-3353857559-print.jpg?amount=${productInfoPrice}&addInfo=${productInfoCode}${userID}`;
      document.getElementById('qrcode').src = QRBankLink;

      //hanler pair
      setTimeout(() => {
        setInterval(async () => {
          await getBankDepositAndPair(productInfoPrice, productInfoCode);
        }, 2000);
      }, 10000);
    });
  });
});

const getBankDepositAndPair = async (productInfoPrice, productInfoCode) => {
  if (isSuccessDeposit) return;
  try {
    const response = await fetch(
      'https://script.googleusercontent.com/macros/echo?user_content_key=1RE6sHAi97gJPsHI93K0HQHRGyIiR_GsWswk6p863c7JB-mAXnzPRn8MvwPYSGihcovSNpihcJYujMz_7s8THPoW7H2shGU-m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCQyOjHDXb6e7X34Qnn2_M9I3JCplff_NgC_Z71an-N-0GTRyq702EEfP5lovHr7gD_IK24n494f52bLMSjSQyEU1v1BLexJuNz9Jw9Md8uu&lib=Mtsi3EkB3fBmHCiSr9lGq43VmyFsXy0BQ'
    );
    const result = await response.json();
    const lastTrans = result.data[result.data.length - 1];

    const isPair =
      lastTrans['Giá trị'] === productInfoPrice &&
      lastTrans['Mô tả'].includes(productInfoCode);

    if (isPair) {
      alert('Đã chuyển khoản thành công');
      isSuccessDeposit = true;
    } else {
      console.log('Giao dịch đang chờ xử lý');
    }
  } catch (error) {
    console.log({ error });
  }
};
