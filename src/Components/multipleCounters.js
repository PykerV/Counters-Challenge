import React from 'react';
import { useSelector } from 'react-redux';
import Counter from './counter';
import CounterForm from './counterForm';
import { v4 as uuidv4 } from 'uuid';
import styles from './multipleCounters.module.scss';


export default function MultipleCounters() {

    const { counters } = useSelector(state => state);

    return (
        <div className={styles['multiple-counters']}>
            <label>Multiple Counters</label>
            <CounterForm />
            <div className={styles['counters-list']}>
                {counters &&
                    counters.map(item => (
                        <Counter value={item} key={uuidv4()}/>
                ))}
            </div>
        </div>
    )
}