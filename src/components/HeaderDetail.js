import React, { Component } from 'react';
import {Container, Stars} from './index';
import '../css/HeaderDetails.css';
//class instead of funciton?
class HeaderDetails extends Component
{
    render(){
        const imgSrc = this.props.imgSrc;
        const startCount = this.props.vote;
        let fakeArray1 = Array(startCount);
        let fakeArray2 = Array(5-startCount);
        fakeArray1.fill(1);
        fakeArray2.fill(1);

        return(
            <div className="headerDetails">
                <div className="headerDetails--decoration">{this.props.status}</div>
                <div className="headerDetails--poster">
                    <img className="headerDetails--poster__img" src={imgSrc} alt="posterImg"/>
                </div>
                <div className="headerDetail--container">
                    <h3 className="headerDetail--container__title">{this.props.mTitle}</h3>
                    <p className="headerDetail--container__desc">{this.props.mDesc}</p>
                    <div className="headerDetail--info">
                        <Container iconName="hourglass" content = {this.props.runtime}/>
                        <Stars fakeArray1={fakeArray1} fakeArray2={fakeArray2}/>
                        <Container iconName="money" content={this.props.revenue}/>
                    </div>
                </div>
            </div>
        )
    }
}

export {HeaderDetails};