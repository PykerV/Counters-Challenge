import React, { useState } from 'react';
import styles from './counter.module.scss';

export default function Counter({ value }) {

    const [counterValue, setCounterValue] = useState(0);

    function runCounter() {
        const nextValue = counterValue + value;
        setCounterValue(nextValue);
    }

    return (
        <div className={styles['counter']}>
            <span>
                Step <label>{` ${value}`}</label>
            </span>
            <h2>{counterValue}</h2>
            <button onClick={runCounter}>Run</button>
        </div>
    )
}