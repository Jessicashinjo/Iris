Iris
    .controller('CalendarCtrl', function($scope,$http,$timeout,$compile,uiCalendarConfig,irisAPIUrl,RootFactory) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        // var tz = date.getTimezoneOffset();
        // console.log("time offset", tz)
        $scope.noteBox = '';
        $scope.events = [];

        RootFactory.getApiRoot()
            .then(
            root => {
                $http.get(`${root.notes}`)
                    .then(res => {
                        console.log("notes res: ", res.data );
                        $scope.populateCalendar(res);
                        $scope.notes= res.data;
                });
                $timeout();
            },
            err => console.log('error', err)
            ).then(
                $timeout //forces scope apply to DOM - reapply everything
            );

        $scope.populateCalendar = function (notes) {
            notes.data.forEach( (note) => {
                $scope.events.push({note_id: note.id, title: note.note_content, start: new Date(note.note_date), allDay: true})
            })
            // console.log($scope.events)
        }

        $scope.addToCalendar = function(noteInfo, selectedDate){
            console.log(selectedDate)
            $http.post(`${irisAPIUrl}/notes/`, {note_content: noteInfo,note_date: selectedDate})
              .then(res => {
                  $scope.events.push({title: res.data.note_content, start: new Date(res.data.note_date), allDay: true})
                console.log("res notes: ", res );
                console.log("events", $scope.events)
                $timeout()
              });
        }

        // $scope.changeTo = 'Hungarian';
        /* event source that pulls from google.com */
        // $scope.eventSource = {
        //         url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
        //         className: 'gcal-event',           // an option!
        //         currentTimezone: 'America/Chicago' // an option!
        // };
        /* event source that contains custom events on the scope */
        // $scope.events = [];
        //   {title: 'All Day Event',start: new Date(y, m, 1)},
        //   {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
        //   {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
        //   {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
        //   {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
        //   {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}

        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, timezone, callback) {
        //   var s = new Date(start).getTime() / 1000;
        //   var e = new Date(end).getTime() / 1000;
        //   var m = new Date(start).getMonth();
        //   var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
          callback($scope.events);
        };

        // $scope.calEventsExt = {
        //    color: '#f00',
        //    textColor: 'yellow',
        //    events: [
        //       {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
        //       {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
        //       {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        //     ]
        // };
        /* alert on eventClick */
        $scope.alertOnEventClick = function( date, jsEvent, view){
            console.log("event clicked", date.title)
            console.log("event date", date.start._d)
            console.log("event date id", date)
            // console.log("jsEvent",jsEvent)
            $scope.alertMessage = (date.title + ' was clicked ');
            $scope.eventTitle = date.title;
            $scope.eventDate = date.start._d.toLocaleDateString();
        };

        /* alert on Drop */
         $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
            console.log("event delta", view)
            $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
            console.log("event", event)
        };
        /* alert on Resize */
        $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
           $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function(sources,source) {
          var canAdd = 0;
          angular.forEach(sources,function(value, key){
            if(sources[key] === source){
              sources.splice(key,1);
              canAdd = 1;
            }
          });
          if(canAdd === 0){
            sources.push(source);
          }
        };
        /* add custom event*/
        // $scope.addEvent = function() {
        //   $scope.events.push({
        //     title: 'Open Sesame',
        //     start: new Date(y, m, 28),
        //     end: new Date(y, m, 29),
        //     className: ['openSesame']
        //   });
        // };
        /* remove event */
        $scope.remove = function(index) {
          $scope.events.splice(index,1);
        };
        /* Change View */
        $scope.changeView = function(view,calendar) {
          uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
        };
        /* Change View */
        $scope.renderCalender = function(calendar) {
          if(uiCalendarConfig.calendars[calendar]){
            uiCalendarConfig.calendars[calendar].fullCalendar('render');
          }
        };
         /* Render Tooltip */
        $scope.eventRender = function( event, element, view ) {
            element.attr({'tooltip': event.title,
                         'tooltip-append-to-body': true});
            $compile(element)($scope);
        };
        /* config object */
        $scope.uiConfig = {
          calendar:{
            height: 450,
            editable: true,
            header:{
              left: 'title',
              center: '',
              right: 'today prev,next'
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender,
          }
        };

        // $scope.changeLang = function() {
        //   if($scope.changeTo === 'Hungarian'){
        //     $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        //     $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
        //     $scope.changeTo= 'English';
        //   } else {
        //     $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        //     $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        //     $scope.changeTo = 'Hungarian';
        //   }
        // };
        /* event sources array*/
        $scope.eventSources = [$scope.events, $scope.eventsF];
        // $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];


        // Mini popout calendar and text input box
              $scope.today = function() {
                $scope.dt = new Date();
              };
              $scope.today();

              $scope.clear = function() {
                $scope.dt = null;
              };

              $scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
              };

              $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
              };

              // Disable weekend selection
              function disabled(data) {
                var date = data.date,
                  mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                // return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
              }

            //   $scope.toggleMin = function() {
            //     $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            //     $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
            //   };
              //
            //   $scope.toggleMin();

              $scope.open1 = function() {
                $scope.popup1.opened = true;

                console.log("this opened")
              };

              $scope.open2 = function() {
                $scope.popup2.opened = true;
              };

            //   $scope.setDate = function(selectedDate) {
            //   $scope.setDate = function(year, month, day) {
                // $scope.dt = new Date(year, month, day);
            //     $scope.dt = selectedDate;
            //     return $scope.dt
            //   };

              $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
              $scope.format = $scope.formats[0];
              $scope.altInputFormats = ['M!/d!/yyyy'];

              $scope.popup1 = {
                opened: false
              };

            //   $scope.popup2 = {
            //     opened: false
            //   };

              var tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              var afterTomorrow = new Date();
              afterTomorrow.setDate(tomorrow.getDate() + 1);
            //   $scope.events = [
            //     {
            //       date: tomorrow,
            //       status: 'full'
            //     },
            //     {
            //       date: afterTomorrow,
            //       status: 'partially'
            //     }
            //   ];

              function getDayClass(data) {
                var date = data.date,
                  mode = data.mode;
                // if (mode === 'day') {
                //   var dayToCheck = new Date(date).setHours(0,0,0,0);

                //   for (var i = 0; i < $scope.events.length; i++) {
                    // var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    // if (dayToCheck === currentDay) {
                    //   return $scope.events[i].status;
                    // }
                //   }
                // }

                return '';
              }
            // });
    })
