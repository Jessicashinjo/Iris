Iris
    .controller('CalendarCtrl', function($scope,$http,$timeout,$compile,uiCalendarConfig,irisAPIUrl,RootFactory) {
        let date = new Date();
        // Holds the value of the textbox for creating notes
        $scope.noteBox = '';
        // contains each note/event displayed on the calendar
        $scope.events = [];

        RootFactory.getApiRoot()
            .then(
            // root is an object with each sensor url & notes as a key
            root => {
                $http.get(`${root.notes}`)
                    .then(res => {
                        // Adds each event/note to the calendar
                        $scope.populateCalendar(res);
                });
                $timeout();
            },
            err => console.log('error', err)
            )

        // Loops through each note from database and adds the note's id, text,
        // and date to the variable which contains the calendar's events
        $scope.populateCalendar = function (notes) {
            notes.data.forEach( (note) => {
                $scope.events.push({note_id: note.id, title: note.note_content, start: new Date(note.note_date), allDay: true})
            })
        }

        // on "add to calendar" button click, it sends a post to Iris api and
        // pushes the event to the local variable which holds calendar events
        $scope.addToCalendar = function(noteInfo, selectedDate){
            // sends event/note to the Iris api
            $http.post(`${irisAPIUrl}/notes/`, {note_content: noteInfo,note_date: selectedDate})
                .then(res => {
                    // updates calendar locally
                    $scope.events.push({title: res.data.note_content, start: new Date(res.data.note_date), allDay: true})
                    $timeout()
                });
        }

        // Updates the calendar every time the calendar view is switched
        $scope.eventsF = function (start, end, timezone, callback) {
            callback($scope.events);
        };

        // populates current event selected box onClick
        $scope.populateEventWindow = function( date, jsEvent, view){
            $scope.eventTitle = date.title;
            $scope.eventDate = date.start._i.toLocaleDateString();
        };

        // remove calendar event
        $scope.remove = function(index) {
            $scope.events.splice(index,1);
        };

        // mini calendar configuration details
        $scope.uiConfig = {
            calendar:{
                height: 450,
                editable: true,
                header:{
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
            eventClick: $scope.populateEventWindow,
            }
        };

        // event sources array
        $scope.eventSources = [$scope.events, $scope.eventsF];

        // Mini popout calendar and text input box
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        // clears the note textbox
        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Allows past dates to be selected on mini calendar
        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };
        $scope.toggleMin();

        // Opens the mini popout calendar
        $scope.openMiniCalendar = function() {
            $scope.miniCalendar.opened = true;
        };

        // Several options for formatting the date in the mini calendar box
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy',
                        'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.miniCalendar = {
            opened: false
        };

        // Get current day
        function getDayClass(data) {
            let date = data.date,
            mode = data.mode;

            return '';
        }
    })
