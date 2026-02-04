import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import useHttp from "../hooks/useHttp";
import Error from "./UI/Error";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig,
  );
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);
  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }
  function handleFinish(){
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmitForm(event) {
    event.preventDefault();

    const fdata = new FormData(event.target);
    const customerData = Object.fromEntries(fdata.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Submitting order...</span>;
  }

  if (error) {
    actions = (
      <Error title="Failed to submit order!" error={error} />
    );
  }

  if(data && !error){
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order has been placed successfully.</p>
        <div className="modal-actions">
          <Button onClick={handleFinish}>Close</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <h2>Checkout</h2>
      <p>Total Amount: {currencyFormatter.format(cartCtx.totalAmount)}</p>
      <form onSubmit={handleSubmitForm}>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
