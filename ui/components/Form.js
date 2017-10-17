import React from 'react';

import Title from './Title';

export default class Form extends React.Component{
    submitAndHide(){
        this.props.onSubmitBTN();
        submit();
    }   

    closeForm(){
        this.props.onSubmitBTN();
    }

    render(){
        return(
            <div id='form' style={{display:this.props.display}}>
            <button id='closeForm' className='btns' onClick={this.closeForm.bind(this)}>Close</button>
            <Title content = 'TimeTron' />
                <label>Title</label>
                    <input type='text' placeholder='Stuff' id='title' className='time' />
                <label>Hrs</label>
                    <input type='text' placeholder='00' id='hrs' className='time' />
                <label>Mins</label>
                    <input type='text' placeholder='00' id='mins' className='time' />
                <label>Secs</label>
                    <input type='text' placeholder='00' id='secs' className='time' />
                <label>Notes</label>
                    <textarea id='note' placeholder='Thoughts...'></textarea>
                <button id='add_timer' className='btns' onClick={this.submitAndHide.bind(this)}>add_timer</button>
            </div>
        );
    }
}
