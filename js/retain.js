$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                date : this.getTime()
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes().reverse();
        },

        getTime: function() {
            var date = new Date();
            var year = date.getUTCFullYear();
            var month = date.getUTCMonth();
            var day = date.getUTCDate();
            month = ("0" + (month + 1)).slice(-2);
            year = year.toString().substr(2,2);
            var dateStamp = month + '/' + day + '/' + year;

            var hour = date.getUTCHours() - (date.getTimezoneOffset() / 60);
            var minute = date.getUTCMinutes();
            hour = ((hour > 12) ? hour - 12 : hour);
            minute = ("0" + (minute + 1)).slice(-2);
            var timeStamp = hour + ':' + minute + ((hour >= 12) ? 'pm' : 'am');

            return dateStamp + ' ' + timeStamp;
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                    note.content +
                    '<div class="note-date">' +
                    note.date + '</div></li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});