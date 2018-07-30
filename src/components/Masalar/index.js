import React , { Component } from 'react';
import DeskStyle from './MasalarStyle.css';
import Menu from '../Menu';
import Navbar from '../Navbar';

class Masalar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[],
          category:[]
        } 
    }

    contains(itemArray,item) {
        var arrayStatus = false;

        for(var i = 0; i < itemArray.length; i++) {
          if(itemArray[i] == item) {
            arrayStatus = true;
          }
        }

        return arrayStatus;
    }

    componentDidMount() {

      var category = [];

       fetch('http://localhost:3001/desk')
       .then(res => res.json())
       .then(masalar => {
         let deskCategory = masalar.map((x, key) => {
            if(!this.contains(category,x.masa_kategori_adi)) {
              category.push(x.masa_kategori_adi);
            }
         }) 

         let desk = masalar.map((masalar, key) => {

          if(masalar.masa_durum == 1) {
            return(
              <div className="column is-3 " key={`${key}`}>
                <a href={`detail/${key+1}`} style={{height:'100px'}} className={`button is-success is-large is-fullwidth`}>{masalar.masa_adi}</a>
              </div>
            ) 
          }

          else if(masalar.masa_durum == 2){
            return(
              <div className="column is-3" key={key}>
                <a href={`detail/${key+1}`} style={{height:'100px'}} className={`button is-info is-large is-fullwidth`}>{masalar.masa_adi}</a>
              </div>
            ) 
          }

          else {
            return(
              <div className="column is-3" key={key}>
                <a href={`detail/${key+1}`} style={{height:'100px'}} className={`button is-danger is-large is-fullwidth`}>{masalar.masa_adi}</a>
              </div>
            )
          }  
        })

          this.setState({
            data:desk,
            category:category
          })         
       })     
    }
    
    render()  {
        return (
          <div className="desk">
            <div className="container is-fluid">
                <Navbar />
              <div className="columns is-multiline">
                  <div className="column is-9 ">
                    <div className="desk-category">
                      <ul>
                        <li>Tümü</li>
                        {
                          this.state.category.map((category,key) => {
                            return (
                                <li>{category}</li>
                            )
                          })
                        }
                      </ul>
                    </div>
                    <hr />
                    <div className="columns is-multiline is-mobile">
                      {this.state.data}
                    </div>
                  </div>
                  <Menu />
              </div>
            </div>
          </div>
        )
    }
}

export default Masalar;