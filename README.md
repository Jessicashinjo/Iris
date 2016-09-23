# Iris
#### Plant Monitoring with sensors using a Particle Photon Device
##### * [Click here for live site](http://irisdashboard.com/) *
#### Why plant monitoring?
---
I love having a plant around my house but I always manage to kill it. I either forget to water it or I leave it outside and it freezes. Using sensors and text alerts was a to solve the problem and play with hardware at the same time.

There are 3 main components to Iris:
1. As the Particle Device collects data from the sensors, if it sees that the temperature reading is below 40 Degrees Farenheit or if the Moisture level falls below 1800 (raw sensor value) it will publish a special event. That event tells IFTTT to send a text message alert to the user.
2. All sensor events from the Particle are sent to a dabase and pulled down by the client with the Iris API and graphed using ChartJS. This allows the user to help detect patterns that occur over time.
3. There is a calendar for the user to store notes or events regarding the plant. For example, the user could note the addition of fertilizer or the removal of dead leaves.



### Screenshot
---

![Sensor Charts](http://res.cloudinary.com/jessicasa/image/upload/v1474609868/Screen_Shot_2016-09-23_at_12.46.34_AM_atkcjn.png)

### Technologies
---
- Python
- Django REST Framework
- SQLite
- AngularJS
- [ChartJS](http://www.chartjs.org/)
- [Particle Photon Device](https://store.particle.io/collections/photon)
- [IFTTT](https://ifttt.com)
- [Full Calendar](https://fullcalendar.io/)
- [Angular UI Calendar](https://github.com/angular-ui/ui-calendar)

### Installation
---
In your terminal navigate to the folder you want the repo to be located and run:
```sh
$ git clone [https://github.com/Jessicashinjo/Iris.git]
```
```sh
$ bower install
```
```sh
$ npm install
```

### License
---
MIT
