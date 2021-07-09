import axios from 'axios'

const server = axios.create({
    baseURL: process.env.VUE_APP_API_SERVER_URL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
})

export {
    server as axios
}