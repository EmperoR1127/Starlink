import React, {Component} from 'react';
import {Row, Col} from 'antd';
import SatSetting from "./SatSetting";
import SatelliteList from "./SatelliteList";
import axios from 'axios';
import {NEARBY_SATELLITE, SAT_API_KEY, STARLINK_CATEGORY} from "../constants";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            satInfo: null,
            settings: null,
            isLoadingList: false
        };
    }

    showNearbySatellite = (setting) => {
        this.setState({
            settings: setting
        })
        this.fetchSatellite(setting);
    }

    fetchSatellite = setting => {
        const {latitude, longitude, elevation, altitude} = setting;
        const url = `/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

        this.setState({
            isLoadingList: true
        });

        axios
            .get(url)
            .then(response => {
                this.setState({
                    satInfo: response.data,
                    isLoadingList: false
                });
            })
            .catch(error => {
                console.log("err in fetch satellite -> ", error);
            });
    };

    render() {
        const { satInfo } = this.state;
        return (
            <Row className='main'>
                <Col span={8}>
                    <SatSetting onShow={this.showNearbySatellite} />
                    <SatelliteList satInfo={satInfo} isLoad={this.state.isLoadingList} />
                </Col>
                <Col span={16} className="right-side">
                    right
                </Col>
            </Row>
        );
    }
}

export default Main;