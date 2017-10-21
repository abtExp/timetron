let id = 2;

function submit() {
    let Title = document.getElementById('title').value,
        Hrs = document.getElementById('hrs').value,
        Mins = document.getElementById('mins').value,
        Secs = document.getElementById('secs').value,
        Notes = document.getElementById('note').value,
        form = document.getElementById('form'),

        title = Title || 'Task',
        hrs = parseInt(Hrs) || 0,
        mins = parseInt(Mins) || 0,
        secs = parseInt(Secs) || 0,
        notes = Notes || '';

    let timer = {
        id: id++,
        title,
        hrs,
        mins,
        secs,
        notes,
        state: true,
        finished: false,
        ticker : null
    }
    addTimer(timer);
}