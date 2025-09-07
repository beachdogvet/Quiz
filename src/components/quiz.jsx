import { useState } from "react";
import Results from "./results";

function Quiz() {

    const questionBank = [
        {
            question: "President Trump is a ?",
            options: ["Dope", "Narcissist", "A great Leader"],
            answer: "Narcissist"
        },
        {
            question: "Who in the end pays for tarrifs?",
            options: ["The Consumer", "The exporting country", "US Government"],
            answer: "The Consumer"
        },
        {
            question: "Humans evolved from?",
            options: ["God", "The Apes", "Aliens"],
            answer: "The Apes"
        },

    ];

    
    const initialAnswers = [null,null,null];

    const [userAnswers, setUserAnswers] = useState(initialAnswers);

    const [currentQuestion,setCurrentQuestion] = useState(0);

    const [isQuizFinished, setQuizIsFinished] = useState(false);

    const selectedAnswer = userAnswers[currentQuestion];


    function handleSelectedOption(option) {
         
        const newUserAnswers = [...userAnswers];
        newUserAnswers[currentQuestion] = option;
        setUserAnswers(newUserAnswers);        
    }

    function goToNext() {

        if( currentQuestion === questionBank.length -1 ) 
        {
            setQuizIsFinished(true) 
        }
        else {
            setCurrentQuestion(currentQuestion + 1);
        }        
    }

    function goToPrev() {

        if(currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } 
    }

    if(isQuizFinished == true) {
        return (
                <div>
                    <Results userAnswers={userAnswers} questionBank={questionBank} restartQuiz={restartQuiz} />
                </div>
        )
    }

    function restartQuiz() {
        setUserAnswers(initialAnswers);
        setCurrentQuestion(0);
        setQuizIsFinished(false);
    }




    return <div>
        
            <h2>Question {currentQuestion + 1}</h2>
            <p className="question"> {questionBank[currentQuestion].question}  </p>


            {questionBank[currentQuestion].options.map((option) => (

                    <button className={"option" + (selectedAnswer === option ? " selected" : "")}
                            onClick={() => handleSelectedOption(option)}> {option}   </button>
            ))}

            <div className="nav-buttons">

                <button onClick={goToPrev} disabled={currentQuestion === 0}> Previous</button>

                <button onClick={goToNext} disabled={!selectedAnswer}> 
                
                    {currentQuestion === questionBank.length -1 ? "Finsh Quiz" : "Next"}       

                </button>
            </div>
                    
        </div>
}

export default Quiz