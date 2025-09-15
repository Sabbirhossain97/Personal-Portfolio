import { Pagination, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { skillslist } from "../../../helpers/skills";
import { LeftGradient } from "../../helpers/Gradient";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/bundle";

export default function Skills() {
  return (
    <div className="relative py-44">
      <LeftGradient />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 xl:px-24">
        <div className="">
          <h2 data-aos="fade-up" className="text-center font-semibold mb-4 tracking-normal text-zinc-800 dark:text-zinc-100 text-3xl">
            Skills
          </h2>
          <div className="mt-20 border">
            <Swiper
              modules={[Pagination, A11y, Autoplay]}
              spaceBetween={50}
              breakpoints={{
                320: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                640: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
              autoplay={{ delay: 1000 }}
              pagination={{
                clickable: true,
                el: ".swiper-custom-pagination",
              }}
            >
              <div>
                {skillslist.map((skill, index) => {
                  let heightClass = skill === "expressjs" ? "h-24": "h-24"
                  return (<SwiperSlide key={index}>
                    <img
                      src={`/assets/${skill}.png`}
                      className={`${heightClass} w-auto`}
                      alt="error"
                    />
                  </SwiperSlide>
                  )
                })}
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>

  );
}
