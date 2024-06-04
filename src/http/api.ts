import axios from 'axios'
// import.meta.env.BASE_URL
const api=axios.create({
    baseURL:'http://localhost:5000/api/users',
    headers:{
        'Content-Type':'application/json'
    }
})



export const loginData=async (data:{email:string,password:string})=>{
    return api.post('/login',data)
}

export const registerData=async (data:{name:string,email:string,password:string})=>{
    return api.post('/register',data)
}


