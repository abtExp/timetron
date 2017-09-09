import  React from 'react';
import ReactDOM from 'react-dom';

//Components
import Timer from '../Timer';
import Form from '../Form';
import Title from '../Title';

class Container extends React.Component{
    constructor(){
        super();
        this.state = {
            formShow : 'flex',
            timers : []
        };
    }
    
    formToggle(){
        if(this.state.formShow === 'flex') this.setState({
            formShow : 'none'
        });
        else this.setState({
            formShow : 'flex'
        });
    }

    render(){
        const tims = this.state.timers.map((i)=>{
            return (<Timer state={i} key={i.id}/>);
        });
        return(
            <div>
                <Title content = 'TimeTron' />
                <Form display={this.state.formShow} />
                <div id='timer_container'>
                    {tims}
                </div>
                <button id='form_toggle' onClick={this.formToggle.bind(this)}>Open Form</button>
            </div>
        );
    }

}

const app = document.getElementById('app-container');
ReactDOM.render(<Container />, app);