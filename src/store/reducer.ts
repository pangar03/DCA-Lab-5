export const reducer = (currentAction: any, currentState: any) => {

    const {action, payload} = currentAction;

    switch (action) {
        case 'ADDTOCART':          
            return {
                ...currentState,
                cart: [...currentState.cart, payload],
            }
            break;
        
        case 'NAVIGATION':
            return{
                ...currentState,
                screen: payload,
            }

        case 'GETPRODUCTS':
            return {
                ...currentState,
                products: payload,
            }
        default: 
            return currentState;
    }
}