"use client";

import {
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "../Layout/Loading/Loading";
import Button from "../Layout/Buttons/Button";
import Cookies from "js-cookie";
import { InfoBox } from "../Layout/InfoBox/InfoBox";

const PUBLISHABLE_KEY = process.env
  .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;
const stripePromise = loadStripe(PUBLISHABLE_KEY);

type EmbeddedCheckoutStripeProps = {
  session_id?: string | null;
  amount: number;
};

const ReserveStripeCheckout = ({
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
      `${process.env.NEXT_PUBLIC_API_URL}/wallet/checkout/session/add-postpaid-credits`,
      {      
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        }
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
  }, []);

  async function SubmitPayment(event:any){
    event.preventDefault();

    const stripe = await stripePromise;
    
    if (!stripe || !clientData) {
      return;
    }

    await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements: stripe.elements(),
      confirmParams: {
        "return_url": `${window.location.origin}/platform/conta?section=creditos&session_id=${checkoutSessionId}&type=pospaid`,
      },
    });

  }


  return !loadingStripe ? (
    <div id="checkout">
      {clientData && (
        <div className=" lg:w-[890px] mx-auto relative  overflow-hidden lg:!rounded-xl">

            <div className={'flex flex-col justify-center p-8'}>
              <span className="dark:text-[#D2D2D2] text-xl text-center mb-5">
                Você está reservando um total de: R$ {amount.toFixed(2)}
              </span>
              <InfoBox>
                A reserva de créditos é uma operação que garante que você terá saldo disponível para uso em sua conta. O valor reservado será descontado de seu saldo disponível e estará disponível para uso em até 7 dias úteis.
              </InfoBox>
            </div>
            <p className="text-center p-2">Para continuar, coloque os dados do seu cartão de crédito abaixo:</p>
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: clientData.client_secret }}
          >
            <form onSubmit={SubmitPayment}>
            <PaymentElement
              className="border-none bg-white p-10"
            />
            <Button
              responsive={false}
              text="Reservar"
              icon="checkmark"
              buttonStyle="accent-button"
              className="!w-full mt-5"
            />
            </form>

          </Elements>
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

export default ReserveStripeCheckout;
