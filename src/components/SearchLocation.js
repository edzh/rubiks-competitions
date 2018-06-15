import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { 
  withScriptjs, 
} from 'react-google-maps';
import { GMAPS_API } from '../firebase/config';

const AutoComplete = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GMAPS_API}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs)((props) =>
  <PlacesAutoComplete
    value={props.address}
    onChange={props.handleChange}
    onSelect={props.handleSelect}
  >
    {({ getInputProps, suggestions, getSuggestionItemProps }) => (
      <div>
        <input
          {...getInputProps({
            placeholder: 'Search Places ...',
            className: 'form-control'
          })}
        />
        <div>
          {suggestions.map(suggestion => {
            const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';

            const style = suggestion.active ?
              { backgroundColor: '#fafafa', cursor: 'pointer' } :
              { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div {...getSuggestionItemProps(suggestion, { className, style })}>
                  <span>{suggestion.description}</span>
                </div>
              )
          })}
        </div>
      </div>
    )}
  </PlacesAutoComplete>
)

class SearchLocation extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      address: '',
      lat: '',
      lng: '',
    }
  }

  handleChange = (address) => {
    this.setState({ address })
  }

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        this.setState({ address });
        this.props.onAddressChange(address, latLng.lat, latLng.lng);
      })
      .catch(error => console.error('Error',error));
  }

  render() {
    const { address } = this.state;

    return (
      <AutoComplete
        handleChange={this.handleChange}
        handleSelect={this.handleSelect}
        address={address} 
      />
    );
  }
}

export default SearchLocation;