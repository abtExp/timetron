import React from 'react';

export default class Title extends React.Component{
    render(){
        return(
            <h1 className='heading'>{this.props.content}</h1>
        )
    }
}