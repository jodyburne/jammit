import React, { useEffect, useRef } from 'react'
import PlaceCard from './PlaceCard'

export default function Map({ options, onMount, className, request }) {
  const props = { ref: useRef(), className }

  function createMarkers(places, map) {
    var bounds = new window.google.maps.LatLngBounds()

    for (var i = 0; i < places.length; i++) {
      let marker = new window.google.maps.Marker({
        map: map,
        title: places[i].name,
        position: places[i].geometry.location,
      })

      if (places[i].photos) {
        console.log(places[i].photos[0].getUrl())
      }

      bounds.extend(places[i].geometry.location)

      let infowindow = new window.google.maps.InfoWindow()
      window.google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker.title)
        infowindow.open(map, this)
      })
    }
    map.fitBounds(bounds)
  }

  const onLoad = () => {
    const map = new window.google.maps.Map(props.ref.current, options)
    let service = new window.google.maps.places.PlacesService(map)

    // Perform a nearby search.
    service.nearbySearch(
      {
        location: { lat: 38.7255007, lng: -9.1808385 },
        radius: 12500,
        keyword: 'jam sessions',
      },

      function(results, status, pagination) {
        if (status !== 'OK') return
        createMarkers(results, map)
      }
    )

    onMount && onMount(map)
  }

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement(`script`)
      script.type = `text/javascript`
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyC1IKp2B5k64M046doaAQiQz6B_OkcvlYg&libraries=places`
      //process.env.GOOGLE_MAPS_API_KEY
      const headScript = document.getElementsByTagName(`script`)[0]
      headScript.parentNode.insertBefore(script, headScript)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()
  })

  return (
    <div
      {...props}
      style={{ height: `70vh`, margin: `1em 0`, borderRadius: `0.5em` }}
    >
      <PlaceCard />
    </div>
  )
}

Map.defaultProps = {
  options: {
    center: { lat: 38.7279179, lng: -9.1682008 },
    zoom: 11.5,
  },
}
