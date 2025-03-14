import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';
import { Slide } from "@/interfaces/slide";


export default function IMGselector({Slides}: {Slides:Slide[]}) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const swiper = useSwiper();

  if (!Array.isArray(Slides) || Slides.length === 0) {
    return null;
  }

  

  return (
    <div className="mt-4">
      {!selectedImage ? (
      
      <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={3}
      navigation
      pagination={{ clickable: false }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
        <h2 className="text-lg font-semibold mb-2">Escolha qual imagem utilizar como referência para receita</h2>
          
            {Slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <img
               
                src={slide.image}
                alt={`Opção ${slide.id + 1}`}
                className="cursor-pointer rounded-lg shadow-md hover:opacity-75 transition-all duration-300"
                onClick={() => setSelectedImage(slide.image)}
              />
              </SwiperSlide>
              
            ))}
          
     
     
    </Swiper>
      ) : (
        <div className="relative">
          <img
            src={selectedImage}
            alt="Imagem selecionada"
            className="rounded-lg shadow-md cursor-pointer"
            onClick={() => setSelectedImage(undefined)}
          />
        </div>
      )}
    </div>
  );
}
