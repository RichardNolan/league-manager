import React from 'react';
import Division from './Division'

const Divisions = (props) => {
    let divisions = props.divisions 
        ? props.divisions
            .sort((a,b)=>{
                return a.rank<b.rank ? 1 : -1
            })
            .map((division, key)=>{
                return <div key={key}><Division division={division}/></div>
            })
        : null
    return (
        <div>
            {divisions}
        </div>
    );
};

export default Divisions;