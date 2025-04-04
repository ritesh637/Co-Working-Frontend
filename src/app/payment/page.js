import { Suspense } from "react";
import PaymentPage from "./PaymentPage";

export default function PaymentPageWrapper() {
  return (
    <Suspense fallback={<div>Loading payment page...</div>}>
      <PaymentPage />
    </Suspense>
  );
}
