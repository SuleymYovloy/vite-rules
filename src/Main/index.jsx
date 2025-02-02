import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.scss";
import { Link } from "react-router-dom";

const cards = [
    {
        id: 1,
        title: "Добро пожаловать!",
        description:
            "Ты вступаешь в мир 'Школы 21' — места, где тебя ждут вызовы, развитие и 26 дней интенсивного обучения!",
    },
    {
        id: 2,
        title: "Правила школы",
        description:
            "В Школе 21 важны ответственность и дисциплина. Соблюдай правила, и у тебя будет шанс пройти путь до конца.",
    },
    {
        id: 3,
        title: "Готов к тесту?",
        description:
            "Чтобы помочь тебе освоиться, мы подготовили небольшой тест. Он несложный, но поможет лучше понять, как устроена школа.",
    },
];

const Main = () => {
    return (
        <div className="main">
            <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                }}
                className="custom-swiper"
            >
                {cards.map((card, index) => (
                    <SwiperSlide key={card.id} className="swiper_slide">
                        <div className="card">
                            <h2>{card.title}</h2>
                            <p>{card.description}</p>
                            {index === cards.length - 1 && (
                                <Link to="/quiz" className="quiz-link">
                                    <span>Перейти к тесту</span>
                                </Link>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Main;
