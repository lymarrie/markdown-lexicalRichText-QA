import * as React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "@yext/pages/components";
import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { BiCaretRightCircle, BiCaretLeftCircle } from "react-icons/bi";

interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const NextArrow = ({ className, style, onClick }: ArrowProps) => {
    return (
      <BiCaretRightCircle
        className={className}
        color="#000000"
        style={{
          ...style,
          height: "50px",
          width: "30px",
        }}
        onClick={onClick}
      />
    );
  };
  
  const PrevArrow = ({ className, style, onClick }: ArrowProps) => {
    return (
      <BiCaretLeftCircle
        style={{
          ...style,
          height: "50px",
          width: "30px",
          zIndex: 10,
        }}
        className={className}
        color="#000000"
        size={50}
        onClick={onClick}
      />
    );
  };

const Carousel = (props) => {
  var { photoGallery } = props;
  // console.log(photoGallery);
  // console.log(photoGallery.length);
  let dummyPhotos = [
    {
        "description": "Placeholder Image",
        "details": "Placeholder Image",
        "image": {
            "alternateText": "Placeholder Image",
            "height": 800,
            "url": "https://i0.wp.com/theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png?fit=1200%2C800&ssl=1",
            "width": 1200
        }
    },
    {
        "description": "Placeholder Image",
        "details": "Placeholder Image",
        "image": {
            "alternateText": "Placeholder Image",
            "height": 800,
            "url": "https://i0.wp.com/theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png?fit=1200%2C800&ssl=1",
            "width": 1200
        }
    },
    {
        "description": "Placeholder Image",
        "details": "Placeholder Image",
        "image": {
            "alternateText": "Placeholder Image",
            "height": 800,
            "url": "https://i0.wp.com/theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png?fit=1200%2C800&ssl=1",
            "width": 1200
        }
    }
  ];
  if (!photoGallery) {
    photoGallery = dummyPhotos;
  } else if (photoGallery.length == 1) {
    photoGallery = photoGallery.concat(dummyPhotos);
  } 
  console.log("photo gallery array after manipulation");
  console.log(photoGallery);
  const photoDivs = photoGallery.map((e) => (
    <div key={e.image.url} className="self-center px-2">
      <a href={e.image.url} target="_blank" rel="noreferrer">
        {/* <Image image={e.image} className="rounded-md" /> */}
        <img src={e.image.url} className="rounded-md"></img>
      </a>
    </div>
  ));

  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);
  
    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);
  
    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addEventListener("change", updateTarget)
  
      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }
  
      return () => media.removeEventListener("change", updateTarget);
    }, []);
  
    return targetReached;
  };


  const settings: Settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    lazyLoad: true, 
    swipeToSlide: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          swipeToSlide: true
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true
        },
      }
    ],
  };

 

  const isBreakpoint = useMediaQuery(768);
  return (
    <>
        <Slider {...settings} className="p-5 drop-shadow">{photoDivs}</Slider> 
    </>
  );
};

export default Carousel;
