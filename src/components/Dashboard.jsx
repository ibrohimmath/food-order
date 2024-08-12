import clsx from "clsx";
import { Select } from "antd";
import Chart from "react-apexcharts";
import { DollarOutlined } from "@ant-design/icons";
import filterIcon from "@/assets/icons/filter.png";
import eren from "@/assets/images/eren.png";
import reinerr from "@/assets/images/reinerr.png";
import levi from "@/assets/images/levi.png";
import historia from "@/assets/images/historia.png";
import hanji from "@/assets/images/hanji.png";
import armin from "@/assets/images/armin.png";
import lagmon from "@/assets/images/lagmon.png";
import macaron from "@/assets/images/macaron.png";
import xinkali from "@/assets/images/xinkali.png";

const customers = [
  {
    imageBackground: "bg-[#eaae69]",
    image: eren,
    name: "Eren Jaegar",
    menu: "Spicy seasoned seafood noodles ",
    payment: "125",
    status: 2,
  },
  {
    imageBackground: "bg-[#65B0F6]",
    image: reinerr,
    name: "Reinerr Braun",
    menu: "Salted Pasta with mushroom sauce",
    payment: "145",
    status: 0,
  },
  {
    imageBackground: "bg-[rgb(243,142,159)]",
    image: levi,
    name: "Levi Ackermann",
    menu: "Beef dumpling in hot and sour soup",
    payment: "105",
    status: 1,
  },
  {
    imageBackground: "bg-[#50D1AA]",
    image: historia,
    name: "Historia Reiss",
    menu: "Hot spicy friend rice with omelet",
    payment: "45",
    status: 2,
  },
  {
    imageBackground: "bg-[#65B0F6]",
    image: hanji,
    name: "Hanji Zoe",
    menu: "Hot spicy fried rice with omelet",
    payment: "245",
    status: 2,
  },
  {
    imageBackground: "bg-[violet]",
    image: armin,
    name: "Armin Arlert",
    menu: "Hot spicy fried rice with omelet",
    payment: "435",
    status: 2,
  },
];

const chartOptions = {
  chart: {
    height: 100,
    type: "radialBar",
    background: "#1f1d2b", // Background color of the chart
    foreColor: "#ffffff", // Default text color
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: "50%", // Size of the inner circle
      },
      track: {
        background: "#333", // Background of the track
        strokeWidth: "97%",
        margin: 0, // margin between the track and the chart edge
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 4,
          opacity: 0.15,
        },
      },
      dataLabels: {
        show: false,
        name: {
          fontSize: "1rem", // Font size of the label name
          fontWeight: "700",
          color: "#ffffff", // Color of the label name
          offsetY: -10,
        },
        value: {
          fontSize: "1rem", // Font size of the value
          color: "#ffffff", // Color of the value
          offsetY: 10,
          formatter: function (val) {
            return val + "%";
          },
        },
        total: {
          show: false,
          label: "TOTAL",
          color: "#ffffff",
          formatter: function () {
            return 249; // Dynamic value for total
          },
        },
      },
    },
  },
  fill: {
    colors: ["#65B0F6", "#FFB572", "#FF7CA3"], // Colors for each section
  },
  stroke: {
    lineCap: "round", // Round line caps
  },
  labels: [
    { title: "Dine In", info: "200 customers" },
    { title: "To Go", info: "122 customers" },
    { title: "Delivery", info: "264 customers" },
  ],
  legend: {
    show: true,
    position: "right", // Position of the legend
    labels: {
      colors: ["white", "white", "white"], // Legend label colors
      useSeriesColors: false,
    },
    markers: {
      width: 15,
      height: 15,
      radius: 50, // Make the markers rounded
      fillColors: ["#65B0F6", "#FFB572", "#FF7CA3"], // Set background colors for the markers
    },
    formatter: (seriesName) => {
      return `<div class="legend-item !mt-0">
        <div class="legend-title !mt-0 !text-[1.1rem] !text-white">${seriesName.title}</div>
        <div class="legend-extra !mt-[0.125rem] !text-[#ABBBC2]">${seriesName.info}</div>
      </div>`;
    },
  },
  tooltip: {
    theme: "dark", // Tooltip theme
  },
};

const chartSeries = [75, 50, 65];

function Dashboard() {
  return (
    <>
      <div className="dashboard-content h-[88vh] w-[60.5%] py-[1rem]">
        <hr />
        <div className="dashboard-cards py-6 grid grid-cols-3 gap-6">
          <div className="dashboard-card bg-[#1f1d2b] p-[1.25rem] rounded-xl">
            <div className="dashbard-card__flex flex items-center">
              <div className="card__icon rounded-xl h-10 w-10 bg-[#252836] flex items-center justify-center text-xl">
                <DollarOutlined className="text-[#9288e0]" />
              </div>
              <div className="card__change ml-4 text-[#50D1AA] text-[0.8rem]">
                +32.40%
              </div>
              <div className="card__change-icon ml-2 w-6 aspect-square rounded-full text-[#50D1AA] bg-[#88E0913D] flex justify-center items-center">
                <i className="fa-solid fa-arrow-up"></i>
              </div>
            </div>
            <div className="dashboard-card__number mt-[0.625rem] font-[600] text-white text-[2rem]">
              $10,243.00
            </div>
            <div className="dashbard-card__info-type mt-1 font-[600] text-[#ABBBC2]">
              Total Revenue
            </div>
          </div>
          <div className="dashboard-card bg-[#1f1d2b] p-[1.25rem] rounded-xl">
            <div className="dashbard-card__flex flex items-center">
              <div className="card__icon rounded-xl h-10 w-10 bg-[#252836] flex items-center justify-center text-xl">
                <i className="fa-regular fa-bookmark text-[#FFB572]"></i>
              </div>
              <div className="card__change ml-4 text-[#FF7CA3] text-[0.8rem]">
                -12.40%
              </div>
              <div className="card__change-icon ml-2 w-6 aspect-square rounded-full text-[#FF7CA3] bg-[#FF64713D] flex justify-center items-center">
                <i className="fa-solid fa-arrow-down"></i>
              </div>
            </div>
            <div className="dashboard-card__number mt-[0.625rem] font-[600] text-white text-[2rem]">
              23,456
            </div>
            <div className="dashbard-card__info-type mt-1 font-[600] text-[#ABBBC2]">
              Total Dish Ordered
            </div>
          </div>
          <div className="dashboard-card bg-[#1f1d2b] p-[1.25rem] rounded-xl">
            <div className="dashbard-card__flex flex items-center">
              <div className="card__icon rounded-xl h-10 w-10 bg-[#252836] text-[#65B0F6] flex items-center justify-center text-xl">
                <i className="fa-solid fa-user-group"></i>
              </div>
              <div className="card__change ml-4 text-[#50D1AA] text-[0.8rem]">
                +2.40%
              </div>
              <div className="card__change-icon ml-2 w-6 aspect-square rounded-full text-[#50D1AA] bg-[#88E0913D] flex justify-center items-center">
                <i className="fa-solid fa-arrow-up"></i>
              </div>
            </div>
            <div className="dashboard-card__number mt-[0.625rem] font-[600] text-white text-[2rem]">
              1,234
            </div>
            <div className="dashbard-card__info-type mt-1 font-[600] text-[#ABBBC2]">
              Total Customer
            </div>
          </div>
        </div>
        <div className="order-report rounded-xl bg-[#1F1D2B] px-6 py-4 overflow-y-hidden text-white">
          <div className="order-report__header flex justify-between items-center gap-8">
            <span className="order-report__title font-[600] text-[1.4rem]">
              Order Report
            </span>
            <div className="order-report__filter rounded-[10px] border-[1px] border-[#393C49] p-4 flex items-center gap-4">
              <img src={filterIcon} />
              <span className="text-[1rem] font-[600]">Filter Order</span>
            </div>
          </div>
          <div className="order-grid__header mt-4 grid grid-cols-[1fr_1fr_1fr_0.8fr] gap-4 font-[600]">
            <div className="order_grid__customer">Customer</div>
            <div className="order_grid__menu">Menu</div>
            <div className="order_grid__payment">Total payment</div>
            <div className="order_grid__status">Status</div>
          </div>
          <hr className="hr !my-4" />
          <div className="order-grid__content h-[32vh] overflow-y-auto">
            {customers.map((customerItem, ind) => (
              <div
                key={ind}
                className="order-grid__content-row py-4 grid grid-cols-[1fr_1fr_1fr_0.8fr] gap-16"
              >
                <div className="customer flex items-center gap-6">
                  <div
                    className={clsx(
                      "customer__icon rounded-full w-fit flex justify-center items-center",
                      customerItem.imageBackground
                    )}
                  >
                    <img
                      src={customerItem.image}
                      alt={customerItem.name}
                      className="w-10 aspect-square"
                    />
                  </div>
                  <div className="customer__name">{customerItem.name}</div>
                </div>
                <div className="menu">{customerItem.menu}</div>
                <div className="payment">${customerItem.payment}</div>
                <div
                  className={clsx(
                    "status rounded-[50px] w-fit h-fit px-4 py-1",
                    customerItem.status === 2 &&
                      "bg-[#6BE2BE3D] text-[#50D1AA]",
                    customerItem.status === 1 &&
                      "bg-[#FFB57233] text-[#FFB572]",
                    customerItem.status === 0 && "bg-[#9290FE33] text-[#9290FE]"
                  )}
                >
                  {customerItem.status === 2
                    ? "Completed"
                    : customerItem.status === 1
                    ? "Pending"
                    : "Preparing"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sidebar--right absolute top-0 right-[1.75rem] h-[99vh] overflow-y-auto w-[34%] py-6 text-white">
        <div className="ordered-most rounded-xl bg-[#1f1d2b] px-6 py-4">
          <div className="ordered-most__header flex items-center justify-between gap-4">
            <span className="ordered-most__title text-[1.4rem] font-[600]">
              Most Ordered
            </span>
            <Select
              size="large"
              defaultValue="today"
              className="custom-select"
              popupClassName="bg-[#1f1d2b] !text-white"
              options={[
                { value: "today", label: "Today" },
                { value: "tomorrow", label: "Tomorrow" },
                { value: "yesterday", label: "Yesterday" },
              ]}
            />
          </div>
          <hr className="!mt-4" />
          <div className="ordered__food mt-8 flex items-start gap-6">
            <img
              src={lagmon}
              className="rounded-full w-14 aspect-square object-cover object-center"
            />
            <div className="ordered__food-content">
              <span className="ordered__food-name block font-[600] text-[1.2rem]">
                Spicy seasoned seafood noodles
              </span>
              <span className="ordered__food-quantity block text-[#ABBBC2]">
                200 dishes ordered
              </span>
            </div>
          </div>
          <div className="ordered__food mt-4 flex items-start gap-6">
            <img
              src={macaron}
              className="rounded-full w-14 aspect-square object-cover object-center"
            />
            <div className="ordered__food-content">
              <span className="ordered__food-name block font-[600] text-[1.2rem]">
                Salted pasta with mushroom sauce
              </span>
              <span className="ordered__food-quantity block text-[#ABBBC2]">
                320 dishes ordered
              </span>
            </div>
          </div>
          <div className="ordered__food mt-4 flex items-start gap-6">
            <img
              src={xinkali}
              className="rounded-full w-14 aspect-square object-cover object-center"
            />
            <div className="ordered__food-content">
              <span className="ordered__food-name block font-[600] text-[1.2rem]">
                Beef dumpling in hot and sour soup
              </span>
              <span className="ordered__food-quantity block text-[#ABBBC2]">
                80 dishes ordered
              </span>
            </div>
          </div>
          <button className="button-view block mt-6 ml-[10%] border-[1px] border-[#ea7c69] rounded-lg w-[80%] !py-2 text-[#ea7c69] !duration-800 hover:-translate-y-4">
            View All
          </button>
        </div>
        <div className="order-type mt-6 rounded-xl bg-[#1f1d2b] px-6 py-4">
          <div className="order-type__header flex items-center justify-between gap-4">
            <span className="ordered-most__title text-[1.4rem] font-[600]">
              Most Type of Order
            </span>
            <Select
              size="large"
              defaultValue="today"
              className="custom-select"
              popupClassName="bg-[#1f1d2b] !text-white"
              options={[
                { value: "today", label: "Today" },
                { value: "tomorrow", label: "Tomorrow" },
                { value: "yesterday", label: "Yesterday" },
              ]}
            />
          </div>
          <div className="line-wrapper py-6">
            <hr />
          </div>
          <div id="chart1 -mt-4 w-[18.75rem] my-0 mx-auto !text-white">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="radialBar"
              height={280}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
