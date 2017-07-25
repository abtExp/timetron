import React from 'react';

export default class Form extends React.Component{
    render(){
        return(
            <div id='form' style={{display:this.props.display}}>
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
                <button id='add_timer' onClick={submit}>add_timer</button>
            </div>
        );
    }
}
