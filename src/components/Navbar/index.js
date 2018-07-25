import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
        var date = new Date();
        this.state = {
            date:date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        }

        this.getTime = this.getTime.bind(this);
    }

    getTime() {
        var date = new Date();
        var saat = date.getHours();
        var dakika = date.getMinutes();
        var saniye = date.getSeconds();
  
        var fullTime = saat + ":" + dakika + ":" + saniye;
  
        this.setState({
          date:fullTime
        })
    }

    componentDidMount() {
        setInterval(() => {
            this.getTime();
        },1000)
    }

    render() {
        return(
            <div>
                <nav 
                    className="navbar is-primary" 
                    style={{marginBottom:'1rem', display:'flex', alignItems:'center',justifyContent:'space-between'
                }}>
                    
                    <h1 
                        style={{paddingLeft:'10px',paddingTop:'20px',fontSize:'20px',color:'#fff'}} 
                        className="subtitle is-4">Looktech Adisyon Sistemi
                    </h1>
                    
                    <h1
                        style={{paddingRight:'10px',fontSize:'20px',color:'#fff'}} 
                        className="subtitle is-4">Saat : {this.state.date}
                    </h1>
                </nav>
            </div>
        ) 
    }
}

export default Navbar;