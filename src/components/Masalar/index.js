import React , { Component } from 'react';
import DeskStyle from './MasalarStyle.css';
import Menu from '../Menu';
import Navbar from '../Navbar';

class Masalar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[],
          category:[],
          masaCategory:'Bahçe'
        } 

        this.categoryChange = this.categoryChange.bind(this);
        this.getData = this.getData.bind(this);
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

    getData() {
      var category = [];

      fetch('http://localhost:3002/desk')
      .then(res => res.json())
      .then(masalar => {
        let deskCategory = masalar.map((x, key) => {
           if(!this.contains(category,x.masa_kategori_adi)) {
             category.push(x.masa_kategori_adi);
           }
        }) 

        let desk = masalar.map((masalar, key) => {
          
         if(masalar.masa_kategori_adi == this.state.masaCategory) {

           var item = [];
           if(masalar.masa_durum == 1) {
             item =  (
               <div className="column is-3 " key={`${key}`} category={`${masalar.masa_kategori_adi}`}>
                 <a href={`detail/${key+1}`} style={{height:'100px'}}  className={`button is-success is-large is-fullwidth`}>{masalar.masa_adi}</a>
               </div>
             )
           }
 
           else if(masalar.masa_durum == 2){
             item = (
               <div className="column is-3" key={key} category={`${masalar.masa_kategori_adi}`}>
                 <a href={`detail/${key+1}`} style={{height:'100px'}} category={masalar.masa_kategori_adi}  className={`button is-info is-large is-fullwidth`}>{masalar.masa_adi}</a>
               </div>
             ) 
           }
 
           else {
             item = (
               <div className="column is-3" key={key} category={`${masalar.masa_kategori_adi}`}>
                 <a href={`detail/${key+1}`} style={{height:'100px'}} category={masalar.masa_kategori_adi}  className={`button is-danger is-large is-fullwidth`}>{masalar.masa_adi}</a>
               </div>
             )
           }
         }           

         return item;
       })

         this.setState({
           data:{masalar,desk},
           category:category
         })         
      })     
    }

    categoryChange(e) {
      this.setState({
       masaCategory:e.target.innerHTML
      })

      this.getData();
     }

    componentDidMount() {
      this.getData();
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
                        {
                          this.state.category.map((category,key) => {
                            return (
                                <li key={key} onClick={(e) => this.categoryChange(e)}>{category}</li>
                            )
                          })
                        }
                      </ul>
                    </div>
                    <hr />
                    <div className="columns is-multiline is-mobile">
                      { 
                        this.state.data['desk']
                      }
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