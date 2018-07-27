import React, { Fragment } from 'react';
import { Card, TextField, Grid, Typography } from '@material-ui/core';

class Division extends React.Component{
    state= {["div_"+this.props.index]:''}

    onChangeName = (e)=>{
        let {name, value} = e.target
        this.setState({[name]:value})
        this.props.onChangeName(name,value)
    }
    componentDidMount(){
        let {data} = this.props
        if( data 
            && data.name
            && data.value   
        ) this.setState({[data.name]:data.value})
    }
    render(){
        return (
            <Card style={{padding:'16px'}}>
                <Typography variant='caption'>
                    Enter a name for Division {(this.props.index+1)}
                </Typography>
                <TextField
                    style={{width:'100%'}}
                    name={"div_"+this.props.index}
                    value={this.state["div_"+this.props.index]}
                    onChange={this.onChangeName}
                />
            </Card>
        )
    }
}
    


class CreateDivisions extends React.Component {
    state={
        divisions:this.props.divisions || [{}]
    }

    onChangeName = (name, value)=>{
        let divisions = [...this.state.divisions]
        let found = false
        divisions.forEach(element => {
            if(element.name===name){
                element.value=value
                found=true
            }
        });
        if(!found) divisions.push({name, value})
        this.setState({divisions})
        this.props.onChange('divisions', divisions) 
        
        let divisionsObject = {}
        for(let d of this.state.divisions){
            if(d.value) divisionsObject[d.value] = this.props.divisionsObject[d.value] || []
        }

        this.props.onChange('divisionsObject', divisionsObject) 
    }


    render(){
        let newDivisions = this.state.divisions.map((el, key)=>{
            let nextEl = this.state.divisions[key+1] || {}
            return(
                <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                    <Division onChangeName={this.onChangeName.bind(this)} index={key} data={nextEl} />
                </Grid>
            )
        })
        return (
            <Fragment>                
                <Typography variant='subheading'>
                    Its important to put the divisions in order as promotion and relegation will follow this order in future release of this application.
                </Typography>
                    
                <Grid container spacing={16}>
                        {newDivisions}
                </Grid>
            </Fragment>
        );
    }
};

export default CreateDivisions;