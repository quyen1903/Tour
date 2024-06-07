import axios from 'axios';
import { showAlert } from './alerts';

const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
};
//use 127.0.0.1 instead of localhost
 
export const login =async (email, password)=>{
    console.log(email,password)
    try {
        const res = await axios ({
            method:'POST',
            url:'https://127.0.0.1:3000/api/v1/users/login',        
            data:{
                email,
                password,
            },
            credentials: "include",
            config
        })
        console.log(res)
        if(res.data.status === 'success'){
            showAlert('success','logged successfully');
            window.setTimeout(() => {
                location.assign('/')
            },1500);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
};

export const logout =async ()=>{
    try {
        const res = await axios({
            method:'GET',
            url:'https://127.0.0.1:3000/api/v1/users/logout'
        });
        if ((res.data.status === 'success')) location.reload(true);
    } catch (error) {
        console.log(err.response);
        showAlert('error', 'Error logging out! Try again.');
    }
}