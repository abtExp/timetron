import  React from 'react';
import ReactDOM from 'react-dom';

//Components
import Timer from '../Timer';
import Form from '../Form';
import Title from '../Title';

let timers;

class Container extends React.Component{
    constructor(){
        super();
        this.state = {
            formShow : 'none',
            timers : []
        };
    }

    componentWillMount(){
        this.setState({
            timers : localStore.timers
        });
        localStore.on('update-state',o=>{
            this.setState({
                timers: o
            })
        })
    }    
    
    formToggle(){
        this.state.formShow === 'flex' ? this.setState({ formShow : 'none' }) 
        : this.setState({ formShow : 'flex' });
    }

    render(){
        let tims,
        timers = this.state.timers;
        if(timers.length > 0){
            tims = timers.map((i)=>{
                return (<Timer state={i} dispatcher='form' key={i.state.id}/>);
            });
        }
        else{
            tims = <h1>No Timers</h1>;
        }
        return(
            <div>
                <Form display={this.state.formShow} onSubmitBTN={this.formToggle.bind(this)}/>
                <div id='timer_container'>
                    {tims}
                </div>
                <button id='form_toggle' className='btns' onClick={this.formToggle.bind(this)}></button>
            </div>
        );
    }

}

const app = document.getElementById('app-container');
ReactDOM.render(<Container />, app);