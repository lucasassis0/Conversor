import React, { Component } from 'react'
import './Conversor.css'

var api_key = 'fef84c2676633f22089b'

export default class Conversor extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            moedaA_valor: "",
            moedaB_valor: 0,
        }

        this.converter = this.converter.bind(this)
    }
    
    converter(){
        var strValor = this.state.moedaA_valor.split("")

        for (let x = 0; x < strValor.length; x++) {
            if (strValor[x] === ',') {
                strValor[x] = '.'
            }
        }
        
        var strFinal = ''
        
        for (let x = 0; x < strValor.length; x++) {
            strFinal = strFinal + strValor[x]
        }

        var valconv = parseFloat(strFinal)

        if (valconv >= 0) {
            let de_para = `${this.props.moedaA}_${this.props.moedaB}`
            let url = `https://free.currconv.com/api/v7/convert?apiKey=${api_key}&q=${de_para}&compact=y`

            fetch(url)
            .then(res=>{
                return res.json()
            })

            .then(json=>{
                let cotacao = json[de_para].val;
                let moedaB_valor = (valconv * cotacao).toFixed(2)
                this.setState({moedaB_valor})
            })
        }else{
            let moedaB_valor = 0
            this.setState({moedaB_valor})
        }
    }

    render() {
        return (
            <div className="conversor">
            
            <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
            <input type="text" id="value" onChange={(event)=>{this.setState({moedaA_valor:event.target.value})}}></input>
            <input type="button" id = "submit" value="Converter" onClick={this.converter}></input>
            <h2>{this.state.moedaB_valor}</h2>

            </div>
        )
    }
}
