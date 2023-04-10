import axios from 'axios'

const url = 'http://localhost:8080/productos/'

let idModify = ''

await axios(`${url}`)
    .then( resp => { console.log(resp.data) } )
    .catch( err => { console.log(err) } )



await axios.post(`${url}`,    
    {
        title:"capuchino",
        price:12223.45,
        thumbnail:"https://cdn2.iconfinder.com/data/icons/coffee-store/64/coffee-05-256.png",
    }
    ).then( resp => { console.log(resp.data)
        idModify = resp.data[0]._id
    } )
    .catch( err => { console.log(err) } )

await axios.put(`${url}${idModify}`, {
        title:"cafe",
        price:12223.45,
        thumbnail:"https://cdn2.iconfinder.com/data/icons/coffee-store/64/coffee-03-512.png",
        id: `${idModify}`
    }   
    ).then( resp => { console.log(resp.data) } )
    .catch( err => { console.log(err) } )

await axios(`${url}`)
    .then( resp => { console.log(resp.data) } )
    .catch( err => { console.log(err) } )

await axios.delete(`${url}${idModify}`
    ).then( resp => { console.log(resp.data) } )
    .catch( err => { console.log(err) } )

await axios(`${url}`)
    .then( resp => { console.log(resp.data) } )
    .catch( err => { console.log(err) } )
