import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import toast from 'react-hot-toast';

const PaymentForm = () => {
  const [amount, setAmount] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [data, setData] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/api/v1/getsubs');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (error) {
        toast.error("An error occurred fetching the subscription data");
      }
    }
    fetchData();
  }, [data]);

  const createPaymentSession = async () => {
    try {
      const response = await axios.post('/api/v1/payment', { amount });
      setSessionId(response.data.sessionId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-full h-full flex items-center justify-center flex-col gap-10'>
    <h2 className='text-4xl font-bold leading-3 mt-10'>Buy our subscription</h2>
    {/* <input type="number" value={amount} onChange={handleAmountChange} /> */}
    <div className='flex flex-wrap gap-2'>
        {data.length === 0 ? (
          <div>Loading...</div>
        ) : (
          data.map((subsData) => (
            <div key={subsData.id} className='flex flex-col gap-2 py-6 px-4 bg-[#dfdfdf]'>
              <p className='text-lg'>{subsData.name}</p>
              <h1 className='text-xl font-bold leading-3'>{subsData.price}</h1>
              <div
                className='border rounded-sm px-2 py-4 cursor-pointer'
                onClick={() => setAmount(subsData.price)}
              >
                Select Plan
              </div>
            </div>
          ))
        )}
      </div>



    <button onClick={createPaymentSession}>Create Payment Session</button>

    {sessionId && (
      <StripeCheckout
        token={() => {
          alert('Payment successful!');
        }}
        stripeKey="pk_test_51Np8bRSHYy487ToZpHya4z76Y7XkC9TbKPPlEcjJhgKWZkVJfSJm1RFcwW0MxLYSgZEtu02HfDhNDoc3Hc3aZSUL00RsFJGOkT"
        amount={amount * 100}
        currency="INR"
        name="Your Product Name"
        description="Payment Description"
      />
    )}
  </div>
  );
};

export default PaymentForm;
