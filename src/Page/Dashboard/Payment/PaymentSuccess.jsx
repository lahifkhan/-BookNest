import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
          });
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div>
      <p>payment successfull</p>
    </div>
  );
};

export default PaymentSuccess;
