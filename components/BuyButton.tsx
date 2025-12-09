"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface BuyButtonProps {
  courseId: string;
  price: number;
  isEnrolled: boolean;
}

import Script from "next/script";

export default function BuyButton({ courseId, price, isEnrolled }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handlePurchase = async () => {
    if (!session) {
      router.push(`/login?redirect=/course/${courseId}`);
      return;
    }

    if (!(window as any).Razorpay) {
      alert("Razorpay SDK is still loading. Please try again in a moment.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Order
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) throw new Error(orderData.error);

      // 2. Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Make sure to expose this in next.config or use env var
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Geonixa LMS",
        description: "Course Purchase",
        order_id: orderData.id,
        handler: async function (response: any) {
          // 3. Verify Payment
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId,
              amount: orderData.amount,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok) {
            router.refresh(); // Refresh to update enrollment status
            router.push("/dashboard");
          } else {
            alert("Payment verification failed: " + verifyData.error);
          }
        },
        prefill: {
          name: session.user.name,
          email: session.user.email,
        },
        theme: {
          color: "#F97316", // Orange-500
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error: any) {
      console.error("Purchase error:", error);
      alert("Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isEnrolled) {
    return (
      <button
        onClick={() => router.push(`/learn/${courseId}`)} // This redirects to the student view
        className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200"
      >
        Go to Course
      </button>
    );
  }

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <button
        onClick={handlePurchase}
        disabled={loading}
        className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-gray-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" /> Processing...
          </>
        ) : (
          `Buy Now for ₹${price}`
        )}
      </button>
    </>
  );
}
