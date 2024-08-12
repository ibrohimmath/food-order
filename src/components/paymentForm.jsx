import { useForm, Controller } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import clsx from "clsx";
import { Select } from "antd";
import { useState } from "react";

function PaymentForm() {
  // Payment Form hook
  const { control, register, handleSubmit, reset } = useForm();

  // Mask input
  const registerWithMask = useHookFormMask(register);

  const [cardType, setCardType] = useState("Credit Card");

  const [paymentButtons, setPaymentButtons] = useState([
    {
      icon: <i className="fa-regular fa-credit-card"></i>,
      name: "Credit Card",
      status: true,
    },
    {
      icon: <i className="fa-brands fa-paypal"></i>,
      name: "Paypal",
      status: false,
    },
    {
      icon: <i className="fa-solid fa-wallet"></i>,
      name: "Cash",
      status: false,
    },
  ]);

  // Payment buttons handling
  const handlePaymentButtons = (ind) => {
    if (paymentButtons[ind].status) return;
    setCardType(paymentButtons[ind].name);
    setPaymentButtons(
      paymentButtons.map((item, id) => {
        if (id !== ind)
          return {
            ...item,
            status: false,
          };
        return {
          ...item,
          status: true,
        };
      })
    );
  };

  // Submit handle for payment
  const onSubmit = (data) => {
    data["card-type"] = cardType;
    console.log(data);
  };

  return (
    <>
      <div className="text-[1.2rem]">Payment Method</div>
      <div className="payment-flex mt-4 flex items-center justify-start gap-2">
        {paymentButtons.map((item, ind) => (
          <div
            key={ind}
            className={clsx(
              item.status && "btn-secondary--active",
              !item.status && "btn-secondary"
            )}
            onClick={() => handlePaymentButtons(ind)}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
            <span className="tick">
              <i className="fa-solid fa-check"></i>
            </span>
          </div>
        ))}
      </div>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="cardholder" className="block text-small">
          Cardholder Name
        </label>
        <input
          type="text"
          className="input-note mt-2"
          id="cardholder"
          {...register("card-holder", {
            required: true,
          })}
        />
        <label htmlFor="card-number" className="block text-small mt-4">
          Card Number
        </label>
        <input
          type="text"
          className="input-note mt-2"
          id="card-number"
          {...registerWithMask("card-number", "9{4} 9{4} 9{4} 9{4}", {
            required: true,
          })}
        />
        <div className="input-flex flex items-center justify-between gap-4">
          <div className="input-flex__item">
            <label htmlFor="expiration-date" className="block text-small mt-4">
              Expiration Date
            </label>
            <input
              type="text"
              className="input-note mt-2"
              id="expiration-date"
              {...registerWithMask("expiration-date", "datetime", {
                required: true,
                inputFormat: "mm/yyyy",
              })}
            />
          </div>
          <div className="input-flex__item">
            <label htmlFor="cvv" className="block text-small mt-4">
              Card Number
            </label>
            <input
              type="text"
              className="input-note mt-2 text-gray-400 font-bold tracking-[0.5rem]"
              id="cvv"
              {...registerWithMask("cvv", "9{3}")}
              onMouseOver={(e) => (e.currentTarget.type = "text")}
              onMouseOut={(e) => (e.currentTarget.type = "password")}
              required
            />
          </div>
        </div>
        <hr />
        <div className="input-flex flex items-center justify-between gap-6">
          <div className="input-flex__item -mt-4">
            <label htmlFor="order-type" className="block text-small mt-5">
              Order type
            </label>
            {/* <Select
            size="large"
            defaultValue="dine-in"
            className="custom-select mt-2"
            options={[
              { value: "dine-in", label: "Dine In" },
              { value: "to-go", label: "To Go" },
              { value: "delivery", label: "Delivery" },
            ]}
            {...register("order-type")}
          /> */}
            <Controller
              name="order-type"
              control={control}
              defaultValue="dine-in"
              render={({ field }) => (
                <Select
                  {...field}
                  size="large"
                  className="custom-select mt-2"
                  options={[
                    { value: "dine-in", label: "Dine In" },
                    { value: "to-go", label: "To Go" },
                    { value: "delivery", label: "Delivery" },
                  ]}
                />
              )}
            />
          </div>
          <div className="input-flex__item">
            <label htmlFor="table-no" className="block text-small mt-4">
              Table no.
            </label>
            <input
              type="text"
              className="input-note mt-2 text-gray-400 font-bold tracking-[0.5rem]"
              id="table-no"
              {...registerWithMask("table-no", "9{3}", {
                required: true,
              })}
            />
          </div>
        </div>
        <div className="button-flex mt-20 flex items-center justify-between gap-4">
          <div className="button-flex__item w-full">
            <button className="btn-large--inverted" onClick={() => reset()}>
              Cancel
            </button>
          </div>
          <div className="button-flex__item w-full">
            <button className="btn-large" type="submit">
              Confirm payment
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default PaymentForm;
