import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Quiz, QuizState } from "../../model/Quiz";
import { loadQuiz } from "../../model/QuizService";
import { QuizComponent } from "./QuizComponent";

/**
 *  Just a wrapper around the actual QuizComponent, now that I've added routing
 * and have to handle actually loading the quiz.
 */
export const QuizPage: React.FunctionComponent = () => {
    const { id } = useParams<{ id: string }>();
    const [quiz, setQuiz] = useState<Quiz>();
    useEffect(() => {
        const fetchData = async (id: string) => {
            const result = await loadQuiz(id);

            // Shuffling the Questions array here instead of the component
            // to maintain consistency for testing.
            const questions = result.questions;
            shuffle(questions);
            result.questions = questions;

            setQuiz(result);
        };
        id != null && fetchData(id);
    }, [id]);

    function shuffle<T>(array: T[]): T[] {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    return (
        quiz === undefined ? <h2>Still Loading</h2> : <QuizComponent quiz={new QuizState(quiz)} />
    );
}