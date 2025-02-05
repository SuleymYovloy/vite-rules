import { useEffect, useState } from "react";
import logo from "../images/logo.png";
import "./index.scss";

// Компонент для отображения результата теста
function Result({ correct, total }) {
  let resultText = "";
  let resultImage = "";

  if (correct === total) {
    resultText =
      "Поздравляем! 🎊 Вы – настоящий эксперт в правилах Школы 21! Ваши знания безупречны, и вы готовы к интенсиву. 🚀";
    resultImage =
      "https://cdn3.iconfinder.com/data/icons/wedding-87/64/Celebration-congratulation-party-anniversary-64.png";
  } else if (correct >= total / 2) {
    resultText =
      "Вы хорошо разбираетесь в правилах Школы 21, но есть небольшие моменты, которые стоит пересмотреть. 🔥";
    resultImage =
      "https://cdn4.iconfinder.com/data/icons/year-80s/64/lighting-star-thunder-weather-electric-256.png";
  } else {
    resultText =
      "Есть к чему стремиться! 🌱 Пока что вы не до конца разобрались с правилами, но у вас есть время подготовиться. 💡";
    resultImage =
      "https://cdn2.iconfinder.com/data/icons/greenline/512/crossed-256.png"; // если fail — это импортированное изображение
  }

  return (
    <div className="result">
      <div className="result_content">
        <img src={resultImage} alt="Result" />
        <h2>{resultText}</h2>
        <button onClick={() => window.location.reload()}>
          Попробовать снова
        </button>
      </div>
    </div>
  );
}

// Компонент для отображения одного вопроса
function Game({ step, question, total, onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [freeResponse, setFreeResponse] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const percentage = Math.round(((step + 1) / total) * 91);

  useEffect(() => {
    setSelectedOption(null);
    setFreeResponse("");
    setShowExplanation(false);
  }, [question]);

  return (
    <div className="quiz-content">
      {/* Прогресс-бар */}
      <div className="progress">
        <div
          style={{ width: `${percentage}%` }}
          className="progress__inner"
        ></div>
      </div>

      {/* Вопрос */}
      <h2 className="question">{question.question}</h2>

      {/* Варианты ответа */}
      {question.options ? (
        <ul>
          {question.options.map((text, index) => {
            let className = selectedOption === index ? "selected" : "";

            // Проверяем правильность ответа, если вопрос не нейтральный
            if (selectedOption !== null && !question.isNeutral) {
              if (
                text.trim().toLowerCase() ===
                question.answer.trim().toLowerCase()
              ) {
                className = "correct";
              } else if (index === selectedOption) {
                className = "incorrect";
              }
            }

            return (
              <li
                key={index}
                className={className}
                onClick={() => {
                  if (selectedOption === null) {
                    setSelectedOption(index);
                    setTimeout(() => setShowExplanation(true), 100);
                  }
                }}
              >
                {text}
              </li>
            );
          })}
        </ul>
      ) : question.reply ? (
        <div>
          <p>{question.reply}</p>
          <input
            className="input"
            type="text"
            value={freeResponse}
            onChange={(e) => setFreeResponse(e.target.value)}
            placeholder="Введите ваш ответ"
          />
        </div>
      ) : null}

      {/* Пояснение с анимацией */}
      <div className={`explanation ${showExplanation ? "visible" : ""}`}>
        <p>{question.explanations || "Нет пояснения для данного вопроса."}</p>
      </div>

      {/* Кнопка "Далее" */}
      {(selectedOption !== null || question.reply) && (
        <button
          onClick={() => {
            if (question.options && question.answer !== undefined) {
              if (
                question.options[selectedOption].trim().toLowerCase() ===
                question.answer.trim().toLowerCase()
              ) {
                onNext(true);
              } else {
                onNext(false);
              }
            } else {
              onNext(null);
            }
          }}
        >
          Далее
        </button>
      )}
    </div>
  );
}

// Главный компонент теста
function Quiz() {
  const [questions, setQuestions] = useState(null);
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        console.log("Всего вопросов:", data.length);
      })
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  if (!questions) {
    return <h2>Загрузка...</h2>;
  }

  // Фильтруем только вопросы с правильным ответом
  const scoredQuestions = questions.filter((q) => q.answer !== undefined);
  console.log("Вопросов с правильными ответами:", scoredQuestions.length);

  // Если вопросов больше нет, показываем результат
  if (step >= questions.length) {
    return <Result correct={correct} total={scoredQuestions.length} />;
  }

  const currentQuestion = questions[step];

  // Функция перехода к следующему вопросу
  const onNext = (isCorrect) => {
    console.log(
      `Ответ на вопрос "${currentQuestion.question}":`,
      isCorrect ? "Верный" : "Неверный"
    );

    if (currentQuestion.answer !== undefined && isCorrect === true) {
      setCorrect((prev) => {
        console.log("Обновление счетчика correct:", prev + 1);
        return prev + 1;
      });
    }

    setStep((prev) => prev + 1);
  };

  return (
    <div className="quiz-wrapper">
      <div className="container">
        <img className="logo" src={logo} alt="21 School Logo" />
        <div className="quiz">
          <Game
            step={step}
            question={currentQuestion}
            total={scoredQuestions.length}
            onNext={onNext}
          />
        </div>
      </div>
    </div>
  );
}

export default Quiz;
