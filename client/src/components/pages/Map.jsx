import React, { useEffect, useRef, useState } from 'react'
import PlaceCard from './PlaceCard'
import { Input, Button } from 'reactstrap'

export default function Map({ options, onMount, className, request }) {
  /* const props = { ref: useRef(), className }
  const [map, setMap] = useState(undefined)
  const [service, setService] = useState(undefined)
  const [mapView, setMapView] = useState(true)
  const [showList, setShowList] = useState({ display: 'none' })

  const [mapStyle, setMapStyle] = useState({
    height: `70vh`,
    margin: `1em 0`,
    borderRadius: `0.5em`,
  })

  const [currentLocation, setCurrentLocation] = useState(getCurrentLocation())
  const [showCard, setShowCard] = useState({ display: 'none' })
  const [placesList, setPlacesList] = useState([])
  const [singlePlace, setSinglePlace] = useState({
    name: 'Empty',
    vinicity: 'Empty',
    photos: [],
  })

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        return pos
      })
    }
  }

  function createMarkers(places, map) {
    let bounds = new window.google.maps.LatLngBounds()

    for (let i = 0; i < places.length; i++) {
      let marker = new window.google.maps.Marker({
        map: map,
        title: places[i].name,
        position: places[i].geometry.location,
      })

      bounds.extend(places[i].geometry.location)

      window.google.maps.event.addListener(marker, 'click', function() {
        setSinglePlace(places[i])
        setShowCard({ display: 'block' })
      })
    }
    map.fitBounds(bounds)
  }

  function findAndCreateMarkers() {
    if (currentLocation) {
      service.nearbySearch(
        {
          location: currentLocation,
          radius: 50500,
          keyword: 'jam sessions',
        },
        function(results, status, pagination) {
          if (status !== 'OK') return
          createMarkers(results, map)
          let newPlacesList = []
          for (let i = 0; i < results.length; i++) {
            newPlacesList.push(results[i])
          }
          setPlacesList(newPlacesList)
        }
      )
    }
  }

  const onLoad = () => {
    let map = new window.google.maps.Map(props.ref.current, options)
    let service = new window.google.maps.places.PlacesService(map)
    setMap(map)
    setService(service)

    let input = document.getElementById('pac-input')
    let searchBox = new window.google.maps.places.SearchBox(input)

    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds())
    })

    searchBox.addListener('places_changed', function() {
      let places = searchBox.getPlaces()
      let markers = []
      setPlacesList([])

      if (places.length === 0) {
        getCurrentLocation()
        return
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null)
      })
      markers = []

      // For each place, get the icon, name and location.
      let bounds = new window.google.maps.LatLngBounds()

      places.forEach(function(place) {
        if (!place.geometry) {
          getCurrentLocation()
          return
        } else {
          setCurrentLocation(place.geometry.location)
        }

        let icon = {
          url: place.icon,
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(25, 25),
        }

        // Create a marker for each place.
        markers.push(
          new window.google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location,
          })
        )

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)
        }
      })
      map.fitBounds(bounds)
    })

    findAndCreateMarkers()

    onMount && onMount(map)
  }

  useEffect(() => {
    if (window.google) {
      findAndCreateMarkers()
    }
  }, [currentLocation])

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement(`script`)
      script.type = `text/javascript`
      /* script.src = `https://maps.google.com/maps/api/js?key=${
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }&libraries=places` */
  /*script.src = `https://maps.google.com/maps/api/js?key=AIzaSyC1IKp2B5k64M046doaAQiQz6B_OkcvlYg&libraries=places`
      //process.env.GOOGLE_MAPS_API_KEY
      const headScript = document.getElementsByTagName(`script`)[0]
      headScript.parentNode.insertBefore(script, headScript)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()
  }, [])

  function handleViewMode() {
    if (mapView) {
      setShowList({ display: 'block' })
      setMapStyle({
        ...mapStyle,
        display: 'none',
      })
      setShowCard({ display: 'none' })
    } else {
      setShowList({ display: 'none' })
      setMapStyle({
        ...mapStyle,
        display: 'block',
      })
    }

    setMapView(!mapView)
  }

  return (
    <div className="placesContainer">
      <Input id="pac-input" />
      <div {...props} style={mapStyle} />
      <div style={showCard}>
        <PlaceCard {...singlePlace} className="SingleCard" />
      </div>
      <Button onClick={handleViewMode} /> List View / Map View
      <div className="ListContainer" style={showList}>
        {placesList.map((place, i) => (
          <PlaceCard {...place} key={i} />
        ))}
      </div>
    </div>
  ) */
}

Map.defaultProps = {
  options: {
    center: { lat: 38.7436057, lng: -9.2302439 },
    zoom: 11.5,
    mapTypeControl: false,
    fullscreenControl: false,
  },
}
