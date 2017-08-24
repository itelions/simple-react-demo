//reducer setter
export function setter(state={text:'12345'},action){
    switch(action.type){
        case 'ADD':
            // 昨天
            // state.text=action.text;
            // return state
            // 现在
            return {text:action.text}
        default:
            return state
    }
}