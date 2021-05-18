import { ACTIONS } from './actionCreator';

const INIT_STATE = {
    counters: []
}

export function reducer(state = INIT_STATE, action) {
    
    return (ACTION_HANDLERS[action.type] || (() => state))(state, action.payload);
}

const ACTION_HANDLERS = {
    [ACTIONS.ADD_COUNTERS]: handleAddCounters
}

function handleAddCounters(state, payload) {

    const counters = [...state.counters];
    counters.push(payload);
    return {
        ...state,
        counters
        //counters: [...state.counters, payload]
    }
}