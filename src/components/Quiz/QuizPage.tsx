import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Quiz, QuizState } from "../../model/Quiz";
import { loadQuiz } from "../../model/QuizService";
import { QuizComponent } from "./QuizComponent";

export const QuizPage: React.FunctionComponent = () => {
    const { id } = useParams<{ id: string }>();
    const [quiz, setQuiz] = useState<Quiz>();
    useEffect(() => {
        const fetchData = async (id: string) => {
            const result = await loadQuiz(id);
            setQuiz(result);
        };
        id != null && fetchData(id);
    }, [id]);
    return (
        quiz === undefined ? <h2>Still Loading</h2> : <QuizComponent quiz={new QuizState(quiz)} />
    );
}