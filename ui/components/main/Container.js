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

    componentWillMount(){
        console.log(localStore);
        this.setState({
            timers : localStore
        })
    }

    componentDidMount(){
        console.log(localStore);
        let timers = this.state.timers;
        localStore.map(i=>{
            i.on('update-state',(e,o)=>{
                console.log('setting state');
                let timer = timers.indexOf(timers.find(i=>i.id === o.id));
                if(Object.getOwnPropertyNames(o).length === 0){
                    console.log('Unmounting Node');
                    document.getElementById('timer_container')
                    .removeChild(document.getElementById('timer'+timer));
                }
                timers[timer] = o;
                this.setState({
                    timers : timers
                })
            })
        })
    }
    
    formToggle(){
        this.state.formShow === 'flex' ? this.setState({ formShow : 'none' }) 
        : this.setState({ formShow : 'flex' });
    }

    render(){
        console.log(localStore);
        let tims;
        if(localStore.length > 0){
            tims = this.state.timers.map((i)=>{
                return (<Timer state={i.state} key={i.state.id}/>);
            });
            localStore.map(i=>{
                i.on('update-state',(e,o)=>{
                    console.log('setting state');
                    let timer = timers.indexOf(timers.find(i=>i.id === o.id));
                    if(Object.getOwnPropertyNames(o).length === 0){
                        console.log('Unmounting Node');
                        document.getElementById('timer_container')
                        .removeChild(document.getElementById('timer'+timer));
                    }
                    timers[timer] = o;
                    this.setState({
                        timers : timers
                    })
                })
            })
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
                <button id='form_toggle' className='btns' onClick={this.formToggle.bind(this)}>Open Form</button>
            </div>
        );
    }

}

const app = document.getElementById('app-container');
ReactDOM.render(<Container />, app);