import React, { Component } from "react";

const Context = React.createContext();

const reducer = (state, action) =>{
    switch (action.type){
        case 'data':
            return {...state, data: action.payLoad};
        case 'check':
            return {...state, check: action.payLoad};
        default:
            return state;
    }
};

export class Provider extends Component{

    state = {
        dispatch: action =>{
            this.setState(state => reducer(state, action))
        },
       data: [],
        check: false

    };

    render(){
        const { state, props: {children} } = this;
        return <Context.Provider value={ state } >{children}</Context.Provider>;
    }
}

export const Consumer = Context.Consumer;

