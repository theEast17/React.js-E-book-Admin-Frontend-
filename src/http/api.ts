import axios from 'axios'
// import.meta.env.BASE_URL
const loginApi=axios.create({
    baseURL:'http://localhost:5000/api/users',
    headers:{
        'Content-Type':'application/json'
    }
})

export const loginData=async (data:{email:string,password:string})=>{
    return loginApi.post('/login',data)
}


