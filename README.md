## Ceres Imaging

# FrontEnd Engineer Candidate Screening

##### Questions/Stumbling points: #####
Filtering the map by magnitude, or a date range:
- see line 35 in Map.vue
- I added a filter object, but it doesn't change the map
- I could apend those paramters to the URL via Javascript, but this should be done thru Vue so it triggers Vue's reactivity system to update the map.

Form:
- added the form elements, but their values are not tied to the map and the related display values.
- once I am able to manually update the map, for example by changing Filter values, I should then be able to use variables for the filter properties that are assigned thru user manipulation of the form elements.

Magnitude display:
- see line 45 in Map.vue
- tried setting a Layer option prop to set the circle size to = the "mag" value from the API data.

Individual Earthquake Pop-ups:
- I found the Mapbox code to do part of this, but its not tied to each earthquake circle and is just a general pop-up in the middle of the screen, that is immediately rendered on page load. When you click it goes away until you refresh the page.
- Not sure how to tie a popup to individual earthquakes. Didn't pursue this too much because I was going after the above.



### About the assignment

- There's no right or wrong way to complete this challenge - we want to see how you solve problems!
- You can spend as much time as you need to complete this, but we don't want to take up too much of your time. Solving every problem isn't mandatory.
- You can run the project locally or you can use Docker. If you use Docker please add the Dockerfile.
- Code styling is important - you can use Prettier or any other option.
- A basic scaffold application with Vue/Vuetify app is available. If you don't feel comfortable with Vue, you can start from scratch with React or any other toolset.
- You can use any tool/library that makes your work faster/easier.

### How to do it

1. Fork the repo
1. Do your magic
1. Push to your fork
1. Create a PR to upstream

### Tasks

1. Create a form in the sidebar to submit filters to the source endpoint including: `starttime`, `endtime` and `minmagnitude`
1. Circle radius must be relative to the earthquake magnitude
1. Add a Popup to the map to show info about clicked point including: `place`, `magnitude` and `time`

![screenshot](https://user-images.githubusercontent.com/360260/120043690-cabf9780-bfe2-11eb-8771-8e5e79f025f7.png)

### Docs

- [USGS API](https://earthquake.usgs.gov/fdsnws/event/1/#parameters)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/)
- [Vue Mapbox](https://vue-mapbox-gl.meta.fr/)
