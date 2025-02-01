import { useNavigate } from "react-router-dom";
import "./index.scss";

// Компонент для отображения результата теста
function Result({ correct, total }) {
    const navigate = useNavigate();

    let resultTitle = "";
    let resultText = "";
    let resultImage = "";

    // Логируем значения correct и total
    console.log("Количество правильных ответов:", correct);
    console.log("Всего вопросов:", total);
    console.log("Порог для большинства:", total / 2);

    if (correct === total) {
        resultTitle = "Поздравляем! 🎊";
        resultText =
            "Вы – настоящий эксперт в правилах Школы 21! Ваши знания безупречны, и вы готовы к интенсиву. 🚀";
        resultImage =
            "https://cdn3.iconfinder.com/data/icons/wedding-87/64/Celebration-congratulation-party-anniversary-64.png";
    } else if (correct >= Math.ceil(total / 2)) {
        // Исправлено: теперь учитываем правильное округление
        resultTitle = "Хороший результат! 🔥";
        resultText =
            "Вы хорошо разбираетесь в правилах Школы 21, но есть небольшие моменты, которые стоит пересмотреть.";
        resultImage =
            "https://cdn4.iconfinder.com/data/icons/year-80s/64/lighting-star-thunder-weather-electric-256.png";
    } else {
        resultTitle = "Есть к чему стремиться! 🌱";
        resultText =
            "Пока что вы не до конца разобрались с правилами, но у вас есть время подготовиться. 💡";
        resultImage = "https://cdn-icons-png.flaticon.com/512/2278/2278992.png";
    }

    return (
        <div className="result">
            <img src={resultImage} alt="Result" />
            <h1 className="result-title">{resultTitle}</h1>
            <h2 className="result-text">{resultText}</h2>
            <button onClick={() => navigate("/quiz")}>Попробовать снова</button>
        </div>
    );
}

export default Result;
