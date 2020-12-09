// Author: lixun910@gmail.com

//  ---------------------------------
//  |   []   []   []  []   []  |  [] |
//  ---------------------------------
// 
// <GeoDaToolbar>
//  <GeoDaButton name="" src="" tooltip=""/>
//  <GeoDaButton name="" src="" tooltip=""/>
// </GeoDaToolbar>

import React from 'react';
import Draggable from 'react-draggable';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {hideAndShowSidePanel, openFileDialog, showTable} from '../actions/actions';

// import action and forward dispatcher
import {showDatasetTable, wrapTo} from 'kepler.gl/actions';

class GeoDaButton extends React.Component {
    // this.props
    floatLeftStyle = {
        margin: '10px',
        display: 'inline-block',
        width: '36px',
        height: '36px'
    };

    render() {
        return (
            <div style={this.floatLeftStyle}>
                <img className="GeoDa-Button"
                    src={this.props.src}
                    alt={this.props.tooltip}
                    onClick={this.props.handler}
                />
            </div>
        );
    }
}

export default class GeoDaToolbar extends React.Component {
    toolbarStyle = {
        borderRadius: '10px',
        position: 'absolute',
        top: '10px',
        left: '50%',
        marginLeft : '-400px',
        zIndex: '100',
        width: '800px',
        height: '50px',
        padding: '10px',
        backgroundColor: '#eee',
        backgroundImage: 'linear-gradient(#eee, #ccc)',
        boxShadow: "5px 5px 20px black",
    };

    innerStyle = {
        height: '100%',
        whiteSpace: 'nowrap'
    };

    mapID = this.props.mapID;
    
    handlerGeoDaOpen = () => { this.props.dispatch(wrapTo(this.mapID, showGeoDaInfo())); };
    handlerGeoDaOpen = () => { this.props.dispatch(wrapTo(this.mapID, openFileDialog())); };
    handlerGeoDaClose = () => {this.props.dispatch(wrapTo(this.mapID, openFileDialog())); };
    handlerGeoDaSave = () => {this.props.dispatch(wrapTo(this.mapID, hideAndShowSidePanel())); };
    handlerGeoDaTable = () => {
        const dataId = this.props.keplerGl[this.mapID].visState.layers[0].config.dataId;
        this.props.dispatch(wrapTo(this.mapID, showTable(dataId))); 
    };

    render() {
        return (
            <Draggable>
            <div style={this.toolbarStyle}>
              <div style={this.innerStyle}>
                <Grid container alignItems="center">
                <GeoDaButton key="0" src="./img/geoda.png" tooltip="GeoDa" handler={this.handlerGeoDaInfo} />
                <Divider key="-1" orientation="vertical" flexItem />
                <GeoDaButton key="1" src="./img/open.png" tooltip="Open" handler={this.handlerGeoDaOpen} />
                <GeoDaButton key="2" src="./img/close.png" tooltip="Close" handler={this.handlerGeoDaClose} />
                <GeoDaButton key="3" src="./img/save.png" tooltip="Save" handler={this.handlerGeoDaSave} />
                <Divider key="-2" orientation="vertical" flexItem />
                <GeoDaButton key="4" src="./img/table.png" tooltip="Table" handler={this.handlerGeoDaTable} />
                <GeoDaButton key="5" src="./img/weights.png" tooltip="Table" handler={this.handlerGeoDaTable} />
                <Divider key="-3" orientation="vertical" flexItem />
                </Grid>
              </div>
            </div>
            </Draggable>
        );
    }
}