"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "../Layout/Loading/Loading";
import Button from "../Layout/Buttons/Button";
import Cookies from "js-cookie";

const PUBLISHABLE_KEY = process.env
  .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;
const stripePromise = loadStripe(PUBLISHABLE_KEY);

type EmbeddedCheckoutStripeProps = {
  session_id?: string | null;
  amount: number;
};

const EmbeddedPrePaidCheckoutStripe = ({
  session_id,
  amount,
}: EmbeddedCheckoutStripeProps) => {
  const [clientData, setClientData] = useState<any>();
  const [loadingStripe, setLoadingStripe] = useState(true);
  const checkoutSessionId = session_id || "{CHECKOUT_SESSION_ID}";
  const [checkoutSessionError, setCheckoutSessionError] = useState<
    string | null
  >();

  async function ProcessCheckout() {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wallet/checkout/session/add-prepaid-credits`,
      {      
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
        body: JSON.stringify({

          "return_url": `${window.location.origin}/platform/conta?section=creditos&session_id=${checkoutSessionId}&type=prepaid&amount=${amount}`,
  "line_items": [
    {
      "price_data": {
        "currency": "brl",
        "unit_amount": amount*100,
        "product_data": {
          "name": "Compra de Créditos",
          "images": []
        },
      },
      "quantity": 1
    }
  ]
        }),
      },
    )
      .then((res: any) => {
        if (!res.ok) {
          const resJson = res.json();
          throw resJson.detail || "Erro desconhecido";
        }

        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClientData(data);
      })
      .catch((error) => setCheckoutSessionError(error))
      .finally(() => setLoadingStripe(false));
  }

  useEffect(() => {
    ProcessCheckout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !loadingStripe ? (
    <div id="checkout">
      {clientData && (
        <div className=" lg:w-[890px] mx-auto relative  overflow-hidden lg:!rounded-xl">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret: clientData.client_secret }}
          >
            <EmbeddedCheckout className="!w-full lg:!w-[992px] lg:left-[-50px] relative !rounded-xl !mx-auto lg:!h-full !bg-opacity-0" />
          </EmbeddedCheckoutProvider>
        </div>
      )}
      {(!clientData || checkoutSessionError) && (
        <>
          {checkoutSessionError && (
            <div className="w-full h-full flex items-center justify-center">
              <div>{checkoutSessionError}</div>
              <div>
                <Button
                  text="Tentar novamente"
                  onClick={() => ProcessCheckout()}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default EmbeddedPrePaidCheckoutStripe;
