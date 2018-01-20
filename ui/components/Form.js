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
            <button id='closeForm' className='btns' onClick={this.closeForm.bind(this)}></button>
            <Title content = 'TimeTron' />
                <label>Title</label>
                    <input type='text' placeholder='Stuff' id='title' className='time' />
                <div id='timerDesc'>
                    <div className='tms'>
                        <label>Hrs</label>
                        <input type='text' placeholder='00' id='hrs' className='time' />
                    </div>
                    <div className='tms'>
                        <label>Mins</label>
                        <input type='text' placeholder='00' id='mins' className='time' />
                    </div>
                    <div className='tms'>
                        <label>Secs</label>
                        <input type='text' placeholder='00' id='secs' className='time' />
                    </div>
                </div>
                <label>Notes</label>
                    <textarea id='note'  className='time' placeholder='Thoughts...'></textarea>
                <button id='add_timer' className='btns' onClick={this.submitAndHide.bind(this)}></button>
            </div>
        );
    }
}
