import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./index.scss";
import { Link } from "react-router-dom";
import { Pagination, Navigation } from "swiper/modules";

const cards = [
    { id: 1, title: "Card 1", description: "This is card 1" },
    { id: 2, title: "Card 2", description: "This is card 2" },
    { id: 3, title: "Card 3", description: "This is card 3" },
    { id: 4, title: "Card 3", description: "This is card 3" },
];

const Main = () => {
    return (
        <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation
            spaceBetween={20}
            slidesPerView={1}
        >
            {cards.map((card, index) => (
                <SwiperSlide slidesPerView="auto" key={card.id}>
                    <div className="card">
                        <h2>{card.title}</h2>
                        <p>{card.description}</p>
                        {index === cards.length - 1 && (
                            <Link to="/quiz" className="quiz-link">
                                <span>Перейти к тестам</span>
                            </Link>
                        )}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Main;
