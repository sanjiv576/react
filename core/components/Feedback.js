'use client'
import { useState } from "react";

// custom component fpr Button

const Button = (props) => {
    // data type of props is Object
    return (
        <button onClick={props.handleClick}>{props.text}</button>
    );
};

// sending data to child components

const Statistics = (props) => {
    const { good, bad, neutral, history } = props;

    const total = good + bad + neutral;
    const average = (good + neutral) / total;
    return (
        <>

            <h1>statistics</h1>
            <p>good : {good} </p>
            <p>bad : {bad} </p>
            <p>neutral : {neutral} </p>
            <p>average : {average} </p>
            <p>all : {total} </p>
            {history}
        </>
    )
};

export default function Feedback() {

    // method -1
    // const [good, setGood] = useState(0);
    // const [bad, setBad] = useState(0);
    // const [neutral, setNeutral] = useState(0);

    // method -1
    // const handleGood = () => setGood(good + 1);
    // const handleBad = () => setBad(bad + 1);
    // const handleNeutral = () => setNeutral(neutral + 1);

    // method - 2 
    const [feedback, setFeedback] = useState(
        { good: 0, bad: 0, neutral: 0 }
    );


    // THIRD TYPE OF STATE IN REACT 
    const [history, setHistory] = useState([]);


    // method - 2

    const handleGood = () => {
        setFeedback({
            ...feedback,
            good: feedback.good + 1
        });
        setHistory(history.concat('G'));

    };

    const handleBad = () => {
        setFeedback({
            ...feedback,
            bad: feedback.bad + 1
        });
        setHistory(history.concat('B'));
    };
    const handleNeutral = () => {
        setFeedback({
            ...feedback,
            neutral: feedback.neutral + 1
        });
        setHistory(history.concat('N'));

    };


    return (
        <>
            <h1>give feedback</h1>

            {/*             
            <button onClick={handleGood}> good  </button>
            <button onClick={handleBad}> bad  </button>
            <button onClick={handleNeutral}> neutral  </button>
 */}

            <Button handleClick={handleGood} text='good' />
            <Button handleClick={handleBad} text='bad' />
            <Button handleClick={handleNeutral} text='neutral' />

            <Statistics
                good={feedback.good}
                bad={feedback.bad}
                neutral={feedback.neutral}
                history = {history}
            />
        </>
    );
}