import React, { Component } from 'react';

class Fetch extends Component {

    state = {
        data : {},
        isEdited : false,
        search : "",
        effect:null,
      }

      handelChange=(event)=> {
        this.setState({
            search : event.target.value
        })    
}

submit=()=>{
    if(this.state.search !== ""){
        fetch(`http://pokeapi.co/api/v2/pokemon/${this.state.search}`)
        .then(res => res.json())
        .then(Data=>{
            console.log("DATA:",Data)
            this.setState({
                data : Data,
                isEdited : true,
                stateTest: Data.abilities[0].ability.url
            })
        })
    
        .then(()=>{
            fetch(`${this.state.stateTest}`)
            .then(res => res.json())
            .then(Data2=>{
                console.log("DATA2:",Data2)
                this.setState({
                    effect : Data2.effect_entries[0].effect
                })
            })
           console.log("stateTest:",this.state.stateTest)
        })
       
     }else if(this.state.search === "") {
        this.setState({
             isEdited : false
         })
     }

  }

    render() {

        return(
<div className="hfsize" id="fs">
    
        <input className="enter" placeHolder="Search by ID or Name" onChange={this.handelChange}></input>
        <button className="search" onClick={this.submit}>Search</button><br/><br/>
        
    <div class="flex-container">
        <div class="flex-container2">
        {this.state.isEdited && "Name: " +this.state.data.name.toLowerCase().split(" ").map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(" ")}<br/>
          {this.state.isEdited && "Type: " +this.state.data.types[0].type.name.toLowerCase().split(" ").map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(" ")}<br/>
          {this.state.isEdited && "Attack: " +this.state.data["stats"][4].base_stat}<br/>
          {this.state.isEdited && "Defense: " +this.state.data["stats"][3].base_stat}<br/>          
          {this.state.isEdited && "Health (HP): " +(this.state.data["stats"][5].base_stat)*10}<br/>
          {this.state.isEdited && "Height: " +this.state.data.height+ " ft"}<br/>
          {this.state.isEdited && "Weight: " +this.state.data.weight+ " lbs"}
          <center><p className="mw"> {this.state.isEdited && "Effect: " + this.state.effect}</p></center>
        </div>

        <div class="flex-container3">
          {this.state.isEdited && <img width="500px" src={"https://pokeres.bastionbot.org/images/pokemon/"+ this.state.data.id + ".png"}/>}
        </div>
    </div>

</div>
        )
    }
}
 
export default Fetch;