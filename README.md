
## Frontend challenge for Ceres Imaging

This is a simple earthquake seach feature consuming the data from [USGS API](https://earthquake.usgs.gov/fdsnws/event/1/#parameters)

### Installing dependencies

1. clone the repo
2. run `npm install` to install necessary dependencies
3. run `npm run serve` to build the local environment

### Stack

This project was develop using vue mapbox, vuex and vuetify

- This was my first time using some of these technologies, so I wanted to give it a try. I had to have an intensive ramp-up in order to make it work.

- I decided to use vuex to manage the states because it was the easiest and cleanest way to manipulate the states and propagate the data between the components.

- Finally, I was able to change the color of the `circle-radius` depending of the value of the magnitude 

### Functionability

The user is able to perfom a search by given three endpoints: `starttime`, `endtime` and `minmagnitude`. These endpoints will submit the filter and return all the data that was requested

### Docs

- [USGS API](https://earthquake.usgs.gov/fdsnws/event/1/#parameters)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/)
- [Vue Mapbox](https://vue-mapbox-gl.meta.fr/)