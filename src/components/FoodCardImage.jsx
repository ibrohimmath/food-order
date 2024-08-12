import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { Image } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function FoodCardImage({ item }) {
  const antImageRef = useRef(null);

  useEffect(() => {
    antImageRef.current.children[0].style.display = "none";
  }, []);

  return (
    <>
      <span ref={antImageRef}>
        <Image
          width={200}
          src={item.image}
          alt={item.name}
          onClick={(e) => e.stopPropagation()}
          className="rounded-full"
        />
      </span>
      <LazyLoadImage
        src={item.image}
        alt={item.name}
        effect="blur"
        wrapperProps={{
          style: { transitionDelay: "0.5s" },
        }}
        onClick={(e) => {
          e.stopPropagation();
          antImageRef.current.children[0].click();
        }}
      />
    </>
  );
}

FoodCardImage.propTypes = {
  item: PropTypes.object,
};

export default FoodCardImage;
