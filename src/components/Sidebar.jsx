import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [linkObjects, setLinkObjects] = useState([
    {
      link: "/home",
      selected: false,
      element: <i className="fa-solid fa-shop"></i>,
    },
    {
      link: "/",
      selected: true,
      element: <i className="fa-solid fa-house"></i>,
    },
    { selected: false, element: <i className="fa-solid fa-percent"></i> },
    {
      link: "/dashboard",
      selected: false,
      element: <i className="fa-solid fa-chart-pie"></i>,
    },
    { selected: false, element: <i className="fa-solid fa-envelope"></i> },
    { selected: false, element: <i className="fa-solid fa-bell"></i> },
    {
      link: "/settings",
      selected: false,
      element: <i className="fa-solid fa-gear"></i>,
    },
    {
      selected: false,
      element: <i className="fa-solid fa-right-from-bracket"></i>,
    },
  ]);

  const location = useLocation();

  useEffect(() => {
    setLinkObjects(
      linkObjects.map((item) => {
        if (item.link && item.link === location.pathname) {
          return {
            ...item,
            selected: true,
          };
        }
        return {
          ...item,
          selected: false,
        };
      })
    );
  }, [location]);

  return (
    <div className="sidebar fixed top-0 left-0 bg-[#1f1d2b] h-[100vh] w-[5rem] flex flex-col justify-around items-center rounded-r-[8px] z-[1]">
      {linkObjects.map((item, ind) => (
        <div
          key={ind}
          className={clsx(
            "sidebar__item-wrapper group block relative rounded-l-[8px] bg-inherit p-[0.75rem] cursor-pointer",
            "before:none before:absolute before:content-[''] before:top-[-1.25rem] before:right-0 before:w-[1.25rem] before:h-[1.25rem] before:rounded-br-[10px] before:bg-transparent ",
            "after:none after:absolute after:content-[''] after:bottom-[-1.25rem] after:right-0 after:w-[1.25rem] after:h-[1.25rem] after:rounded-tr-[10px] after:bg-transparent",
            "hover:bg-[#252836] hover:translate-x-[4%] hover:before:shadow-custom-before hover:after:shadow-custom-after hover:*:text-white",
            item.selected &&
              "!bg-[#252836] translate-x-[4%] before:shadow-custom-before after:shadow-custom-after *:text-white"
          )}
        >
          <Link to={item.link || "#"}>
            {ind ? (
              <div
                className={clsx(
                  "sidebar__item relative rounded-[8px] h-[3.2rem] w-[3.2rem] flex justify-center items-center text-[1.7rem] text-[#ea7c69] cursor-pointer duration-400 group-hover:bg-[#ea7c69] group-hover:text-white",
                  item.selected && "bg-[#ea7c69] text-white"
                )}
              >
                {item.element}
              </div>
            ) : (
              <div className="sidebar__item relative rounded-[8px] h-[3.2rem] w-[3.2rem] flex justify-center items-center text-[1.7rem] text-[#ea7c69] cursor-pointer duration-400 bg-[#a45353] sidebar__item--first">
                <div className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-orange-400 to-red-400">
                  <i className="fa-solid fa-shop"></i>
                </div>
              </div>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
