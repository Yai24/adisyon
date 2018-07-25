import React , { Component } from 'react';
import DeskStyle from './MasalarStyle.css';
import Menu from '../Menu';
import Navbar from '../Navbar';

class Masalar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[],
        } 
    }

    componentDidMount() {

        var fakeData = [
          {
            masa_adi:'Masa 1',
            masa_durum:'1'
          },
          {
            masa_adi:'Masa 2',
            masa_durum:'3'
          },
          {
            masa_adi:'Masa 3',
            masa_durum:'1'
          },
          {
            masa_adi:'Masa 4',
            masa_durum:'2'
          },
          {
            masa_adi:'Masa 5',
            masa_durum:'1'
          },
          {
            masa_adi:'Masa 6',
            masa_durum:'2'
          }
        ]

        let desk = fakeData.map((masalar, key) => {

          if(masalar.masa_durum == 1) {
            return(
              <div className="column is-3 " key={`${key}`}>
                <a href={`detail/${key}`} style={{height:'100px'}} className={`button is-success is-large is-fullwidth`}>{masalar.masa_adi}</a>
              </div>
            ) 
          }

          else if(masalar.masa_durum == 2){
            return(
              <div className="column is-3" key={key}>
                <a href={`detail/${key}`} style={{height:'100px'}} className={`button is-info is-large is-fullwidth`}>{masalar.masa_adi}</a>
              </div>
            ) 
          }

          else {
            return(
              <div className="column is-3" key={key}>
                <a href={`detail/${key}`} style={{height:'100px'}} className={`button is-danger is-large is-fullwidth`}>{masalar.masa_adi}</a>
              </div>
            )
          }  
        })

      this.setState({
        data:desk
      })  
    }


    render()  {
        return (
          <div className="desk">
            <div className="container is-fluid">
                <Navbar />
              <div className="columns is-multiline">
                  <div className="column is-9 ">
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