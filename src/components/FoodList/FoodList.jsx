import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import clsx from "clsx";
import "react-lazy-load-image-component/src/effects/blur.css";
import PropTypes from "prop-types";

import { Select, Drawer, Flex } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import useProductStore from "@/store/store";

import Navbar from "@/components/Navbar";
import PaymentForm from "../paymentForm";
import FoodCardImage from "../FoodCardImage";

function FoodList({ seenFoodNav = false, seenFoodFilter = false }) {
  // Buttons state
  const { selectText } = useProductStore();
  const [btns, setBtns] = useState([
    {
      name: "Dine In",
      status: true,
    },
    {
      name: "To Go",
      status: false,
    },
    {
      name: "Delivery",
      status: false,
    },
  ]);

  // Active button state
  const [btnInd, setbtnInd] = useState(0);

  // Payment state
  const [showPayment, setShowPayment] = useState(false);

  // selected products list in drawer
  const selectProductList = useProductStore((state) => state.selectedFood);

  // Foods state
  const foodList = useProductStore((state) => state.foodList);

  // Foods filtering due to filter text in search input
  const filterFoods = () => {
    let foods = foodList;
    // console.log("Foods get", foods);
    if (selectText) {
      const textLowered = selectText.toLowerCase();
      foods = foods.filter((foodItem) =>
        foodItem.name.toLowerCase().includes(textLowered)
      );
    }
    return foods;
  };

  // Total price
  const total = useProductStore((state) => state.total);

  // Drawer state
  const [open, setOpen] = useState(false);

  const obj = {};
  obj["defaultValues"] = {};
  for (const item of FilterFoodList()) {
    obj["defaultValues"][`food-order-${item.id}`] = String(item.quantity);
  }
  // console.log("Object", obj);
  // Food Form hook
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue,
  } = useForm(obj);
  // Mask input
  const registerWithMask2 = useHookFormMask(register2);

  // Submit handle for food price
  const onSubmit2 = (data) => console.log(data);

  // Drawer handlers
  const onClose = () => {
    if (showPayment) {
      setShowPayment(false);
      return;
    }
    setOpen(false);
  };

  const showChildrenDrawer = () => {
    setShowPayment(true);
  };
  const onChildrenClose = () => {
    setShowPayment(false);
  };

  // State handlers for buttons
  const handleButtons = (ind) => {
    if (!btns[ind].status) {
      setBtns([
        ...btns.slice(0, ind).map((item) => ({
          ...item,
          status: false,
        })),
        {
          name: btns[ind].name,
          status: true,
        },
        ...btns.slice(ind + 1).map((item) => ({
          ...item,
          status: false,
        })),
      ]);
      setbtnInd(ind);
    }
  };

  // selected foods filter handler
  function FilterFoodList() {
    return foodList.filter((item) => selectProductList.includes(item.id));
  }
  // selectProductList handlers
  const ViewSelectProduct = useProductStore((state) => state.viewSelectProduct);

  // delete from selected products handler
  const deleteSelectedProduct = useProductStore(
    (state) => state.deleteSelectedProduct
  );

  // quantity handler
  const ProductQuantity = useProductStore((state) => state.productQuantity);

  // food notes handler
  const handleFoodNote = useProductStore((state) => state.handleFoodNote);

  // Payment ochiq turganida price nolga tushsa payment yopilib qolishi kerak
  useEffect(() => {
    if (!total) {
      onChildrenClose();
    }
  }, [total]);

  return (
    <>
      {/* Drawer (Modal) */}
      <Drawer
        mask={false}
        onClose={onClose}
        open={open}
        className={clsx(
          "!bg-[#1f1d2b] text-md !text-white",
          showPayment && "fixed right-[18.5rem]"
        )}
        width={"30rem"}
        title={
          <>
            {showPayment ? (
              <div
                className={clsx(
                  "flex items-center justify-between flex-wrap gap-4"
                )}
              >
                <div
                  className={clsx(
                    "col flex flex-col justify-between gap-y-4 gap-x-2"
                  )}
                >
                  <span className="text-[1.5rem]">Confirmation</span>
                  <span className="text-[1.1rem] text-[#ABBBC2] font-[500]">
                    Orders #34562
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-[1.1rem]">Orders #34562</span>
            )}
          </>
        }
        closeIcon={
          showPayment ? (
            <i className="fa-solid fa-arrow-left-long text-white"></i>
          ) : (
            <i className="fa-solid fa-xmark text-white"></i>
          )
        }
        styles={{
          header: {
            borderBottom: `${showPayment ? "1px solid #393C49" : "none"}`,
          },
        }}
      >
        <form onSubmit={handleSubmit2(onSubmit2)}>
          <div
            className={clsx(
              "relative overflow-auto pb-8",
              btnInd === 0 && "!h-[57vh]",
              btnInd === 2 && "!h-[50vh]",
              !total && "!h-[80vh]"
            )}
          >
            {/* Buttons */}
            <Flex gap="small" wrap>
              {btns.map((item, ind) => (
                <button
                  key={ind}
                  className={clsx(
                    item.status && "btn--active",
                    !item.status && "btn"
                  )}
                  onClick={() => handleButtons(ind)}
                >
                  {item.name}
                </button>
              ))}
            </Flex>

            {/* Dine In contents */}
            {(!btnInd || btnInd === 2) && (
              <div className="drawer__content absolute top-16 w-full">
                <div className="flex-outer pr-4 flex gap-4 text-[1rem]">
                  <div className="col-first w-[85%]">
                    <div className="flex-inner flex justify-between gap-4">
                      <div className="col-inner-first w-[80%]">Item</div>
                      <div className="col-inner-second text-center w-[20%]">
                        Qty
                      </div>
                    </div>
                  </div>
                  <div className="col-second w-[15%] flex justify-center text-center">
                    Price
                  </div>
                </div>
                {FilterFoodList()?.map((item) => (
                  <div
                    key={item.id}
                    className="food-card mt-2 px-4 py-4 rounded-[8px] duration-400 hover:shadow-food-card"
                  >
                    <div className="flex-outer flex items-center gap-4 text-[1rem]">
                      <div className="col-first w-[85%]">
                        <div className="flex-inner flex justify-between items-center gap-4">
                          <div className="food-card__desc w-[80%] flex items-center gap-[1rem]">
                            <img
                              src={item.image}
                              className="food-card__image h-14 w-14 rounded-full object-cover object-center"
                            />
                            <div className="food-card__info flex flex-col justify-between text-[0.95rem]">
                              <div className="food-card__name">
                                Spicy seasoned sea...
                              </div>
                              <div className="food-card__price text-[#ABBBC2]">
                                $ {item.price}
                              </div>
                            </div>
                          </div>
                          <input
                            type="text"
                            className="col-inner-second input"
                            value={item.quantity}
                            {...registerWithMask2(
                              `food-order-${item.id}`,
                              "9{1,}",
                              {
                                required: true,
                                onChange: (e) => {
                                  const valueClear = e.target.value.replace(
                                    /^0+/,
                                    ""
                                  );
                                  console.log("Changed", valueClear);
                                  ProductQuantity(valueClear, item.id);
                                  setValue(`food-order-${item.id}`, valueClear);
                                },
                              }
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-second w-[15%] flex justify-center text-center text-[1.1rem]">
                        ${" "}
                        {(
                          Number.parseFloat(item.price) * item.quantity
                        ).toFixed(3)}
                      </div>
                    </div>
                    <div className="mt-4 flex-outer flex items-center gap-4 text-[1rem]">
                      <div className="col-first w-[85%] text-[0.9rem]">
                        <input
                          type="text"
                          placeholder="Please, just a little bit spicy only."
                          value={item.note || ""}
                          className="input-note"
                          onChange={(e) =>
                            handleFoodNote(e.target.value, item.id)
                          }
                        />
                      </div>
                      <div
                        onClick={() => deleteSelectedProduct(item.id)}
                        className="col-second w-[15%] aspect-square rounded-[8px] border-[1px] border-[#FF7CA3] flex justify-center items-center text-center text-[#FF7CA3] cursor-pointer duration-500 hover:border-red-700 hover:text-red-700"
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/*  food cards footer */}
          {total > 0 && (
            <div className="drawer__footer absolute left-6 right-6 bottom-0 pt-6 pb-4 border-t-2 border-t-[#393C49] !bg-[#1F1D2B] z-[1] !text-[1.2rem]">
              {btnInd === 2 && (
                <div className="flex-discount flex flex-wrap justify-between items-center gap-4 font-[400]">
                  <span className="block text-[#ABBBC2] text-[1rem]">
                    Delivery
                  </span>
                  <span className="block">$ {(total * 0.1).toFixed(3)}</span>
                </div>
              )}
              <div
                className={clsx(
                  "flex-discount flex flex-wrap justify-between items-center gap-4 font-[400]",
                  btnInd === 2 && "mt-4"
                )}
              >
                <span className="block text-[#ABBBC2] text-[1rem]">
                  Discount
                </span>
                <span className="block">$0</span>
              </div>
              <div className="flex-subtotal mt-4 flex flex-wrap justify-between items-center gap-4 font-[400]">
                <span className="block text-[#ABBBC2] text-[1rem]">
                  Sub total
                </span>
                <span className="block">
                  $ {btnInd === 2 ? (total * 1.1).toFixed(3) : total.toFixed(3)}
                </span>
              </div>
              <button
                className={clsx(showPayment && "hidden", "btn-large")}
                onClick={showChildrenDrawer}
                type="submit"
              >
                Continue to Payment
              </button>
            </div>
          )}
        </form>

        <Drawer
          mask={false}
          title={
            <>
              <span className="text-[1.5rem]">Payment</span>
              <span className="text-[1.1rem] mt-4 text-[#ABBBC2]">
                3 payment method available
              </span>
            </>
          }
          onClose={onChildrenClose}
          open={showPayment}
          className="!bg-[#1f1d2b] pr-6 text-md !text-white !z-10 !border-t-[#1F1D2B] !border-r-[#1F1D2B] !border-b-[#1F1D2B] !border-l-[#393C49] border-2"
          width={"30rem"}
          closeIcon={<i className="fa-solid fa-xmark text-white"></i>}
          headerStyle={{ border: "1px solid #393C49" }}
        >
          <PaymentForm />
        </Drawer>
      </Drawer>
      {/* Foods Nav */}
      {!seenFoodNav || <Navbar />}
      {/* Foods Filter */}
      {seenFoodFilter && (
        <div className="filter mt-[1.5rem] flex flex-wrap justify-between items-center !text-white">
          <span className="text-md">Choose dishes</span>
          <Select
            size="large"
            defaultValue="dine-in"
            className="custom-select"
            popupClassName="bg-[#1f1d2b] !text-white"
            options={[
              { value: "dine-in", label: "Dine In" },
              { value: "to-go", label: "To Go" },
              { value: "delivery", label: "Delivery" },
            ]}
          />
        </div>
      )}
      {/* Foods Cards on content side */}
      <div className="w-full flex flex-wrap gap-[2rem_3rem]">
        {filterFoods()?.map((item, ind) => (
          <div
            key={ind}
            className="food-card--sm cursor-pointer !text-white"
            onClick={() => {
              ViewSelectProduct(item.id);
              setOpen(true);
            }}
          >
            <FoodCardImage item={item} />
            <div className="food-name">{item.name}</div>
            <div className="food-price">$ {item.price}</div>
            <div className="food-available">{item.available}</div>
            <div className="food-card--sm-back"></div>
          </div>
        ))}
      </div>
    </>
  );
}

FoodList.propTypes = {
  seenFoodNav: PropTypes.bool,
  seenFoodFilter: PropTypes.bool,
};

export default FoodList;
