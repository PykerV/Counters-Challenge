export const ACTIONS = {
    ADD_COUNTERS: 'ADD_COUNTERS' 
}

export const addStepCounter = stepVal => ({ type: ACTIONS.ADD_COUNTERS, payload: stepVal });