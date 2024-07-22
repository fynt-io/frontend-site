"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "../Layout/Loading/Loading";
import Button from "../Layout/Buttons/Button";

const PUBLISHABLE_KEY = process.env
  .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;
const stripePromise = loadStripe(PUBLISHABLE_KEY);

type EmbeddedCheckoutStripeProps = {
  session_id?: string | null;
  unit_amount?: number;
  quantity?: number;
  product_name?: string;
  product_images?: string[];
  recurring_interval?: number;
  seller_id: string;
};

const EmbeddedCheckoutStripe = ({
  quantity,
  session_id,
  product_name,
  unit_amount = 160,
  product_images = [],
  recurring_interval = 1,
  seller_id,
}: EmbeddedCheckoutStripeProps) => {
  const [clientData, setClientData] = useState<any>();
  const [loadingStripe, setLoadingStripe] = useState(true);
  const checkoutSessionId = session_id || "{CHECKOUT_SESSION_ID}";
  const [checkoutSessionError, setCheckoutSessionError] = useState<
    string | null
  >();

  async function ProcessCheckout() {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wallet/subscription/checkout/session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          line_items: [
            {
              price_data: {
                currency: "brl",
                recurring: {
                  interval: "month",
                  interval_count: recurring_interval,
                },
                unit_amount: parseInt(String(unit_amount * 100)),
                product_data: {
                  name: product_name,
                  images: product_images,
                },
              },
              quantity: quantity,
            },
          ],
          return_url: `${window.location.origin}/signup/returned?session_id=${checkoutSessionId}`,
          seller_id: seller_id,
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

export default EmbeddedCheckoutStripe;
