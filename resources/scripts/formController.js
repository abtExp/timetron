// const Actions = require('../actions/Actions');
let id = 0;

function submit(){
    let Title = document.getElementById('title').value, 
    Hrs = document.getElementById('hrs').value,
    Mins = document.getElementById('mins').value,
    Secs = document.getElementById('secs').value,
    Notes = document.getElementById('note').value,
    form = document.getElementById('form'),

    title = Title ? Title : 'Task',
    hrs = Hrs ? parseInt(Hrs) : 0,
    mins = Mins ? parseInt(Mins) : 0,
    secs = Secs ? parseInt(Secs) : 0,
    notes = Notes ? Notes : '';

    let timer = {
        id : id++,
        title,
        hrs,
        mins,
        secs,
        notes,
        state : true,
        finished : false
    }

    Actions.fire(0,'ADD_TIMER',timer);
    render(id);
    form.style.display = 'none';
}