import React, {Component} from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {createAction} from 'redux-actions';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

//import KeplerGl from 'kepler.gl';
import {addDataToMap, wrapTo, toggleModal} from 'kepler.gl/actions';
import {
  SidebarFactory,
  PanelHeaderFactory,
  PanelToggleFactory,
  CustomPanelsFactory,
  injectComponents
} from 'kepler.gl/components';

import GeoDaSidePanelFactory from './components/geoda-panel';
import {showModal, hideAndShowSidePanel} from './actions/actions';

const MAPBOX_TOKEN = "pk.eyJ1IjoibGl4dW45MTAiLCJhIjoiY2locXMxcWFqMDAwenQ0bTFhaTZmbnRwaiJ9.VRNeNnyb96Eo-CorkJmIqg";

// Inject custom components; comment import KeplerGl from 'kepler.gl'
const KeplerGl = injectComponents([
  [CustomPanelsFactory, GeoDaSidePanelFactory]
]);

class App extends Component {
    componentDidMount() {
        // action after component mount
        //this.props.dispatch(wrapTo('map1', addDataToMap({datasets: sampleData,config})));
        //this.props.dispatch(toggleModal(null))
    }
  
    _toggleSidePanelVisibility = () => {
      this.props.dispatch(wrapTo('map1', hideAndShowSidePanel()));
    };
  
    render() {
      const {
        geoda: {modal}
      } = this.props;
      
      return (
        <div style={{position: 'absolute', width: '100%', height: '100%'}}>
          <button onClick={this._toggleSidePanelVisibility}> Hide / Show Side Panel</button>
          <AutoSizer>
            {({height, width}) => (
              <KeplerGl mapboxApiAccessToken={MAPBOX_TOKEN} id="map1" width={width} height={height} />
            )}
          </AutoSizer>
        </div>
      );
    }

    _closeModal = () => {
      this.props.dispatch(showModal(null));
    };
  
    _openModal = id => {
      this.props.dispatch(showModal(id));
    };

  }
  

  const mapStateToProps = state => state;
  const dispatchToProps = dispatch => ({dispatch});
  
  export default connect(mapStateToProps, dispatchToProps)(App);