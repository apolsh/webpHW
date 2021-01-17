export default (state = [], action)=>{
    switch (action.type){
        case 'FETCH_POSTS':
            return action.payload;
        case 'DELETE_POST':
            return state.filter(post=>post._id !== action.payload)
        default:
            return state;
    }
}