let defaultState = {
    data: [],
    blckColor: "#171717",
    brdrColor: "#5c5b5b",
    blockBorderColor: "#5c5b5b"
}

const dataReducer = (state = defaultState, action) => {
    let newState = {...state}

    switch (action.type) {
        case "SET":
            newState = {
                data: action.payload.data,
                blckColor: action.payload.blckColor,
                brdrColor: action.payload.brdrColor,
                blockBorderColor: action.payload.blockBorderColor
            }
        return newState;
        default:
            return newState
    }
}

export default dataReducer