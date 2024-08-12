import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Tabs } from "antd";

import "@/assets/styles/global.scss";

const linkLists = [
  {
    to: "hot-dishes",
    value: "Hot Dishes",
  },
  {
    to: "cold-dishes",
    value: "Cold Dishes",
  },
  {
    to: "soup",
    value: "Soup",
  },
  {
    to: "grill",
    value: "Grill",
  },
  {
    to: "appetizer",
    value: "Appetizer",
  },
  {
    to: "#",
    value: "Dessert",
  },
];

function Navbar({ links = linkLists }) {
  const items = links.map((item, ind) => ({
    key: String(ind),
    label: (
      <Link to={"#"} className="!text-inherit">
        {item.value}
      </Link>
    ),
  }));

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      {/* Home page Nav version using ant design tabs  */}
      <div className="tabs-wrapper">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          tabBarStyle={{ color: "white !important", fontWeight: "500" }}
        />
      </div>
      <hr />
    </>
  );
}

Navbar.propTypes = {
  links: PropTypes.array,
};
export default Navbar;
