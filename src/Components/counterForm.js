import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStepCounter } from '../StateManager/actionCreator';
import styles from './counterForm.module.scss';

export default function CounterForm() {

    const [stepValue, setStepValue] = useState('');
    const dispatch = useDispatch();

    function changeStepValue(e) {
        setStepValue(+e.target.value);
    }

    function submitStepCounter() {
        if(stepValue !== '') {
            dispatch(addStepCounter(stepValue));
        }
        setStepValue('');
    }

    return (
        <div className={styles['counter-form']}>
            <input placeholder="Step (only accept Numbers)" type="number" value={stepValue} onChange={changeStepValue}/>    
            <button onClick={submitStepCounter}>Add Counter</button>
        </div>
    )
}