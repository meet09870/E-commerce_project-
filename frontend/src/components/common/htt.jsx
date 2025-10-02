export const apiUrl = 'http://127.0.0.1:8000/api'

export const adminToken = () => {
const data = localStorage.getItem('adminInfo')
const adminData =JSON.parse(data);
return adminData.token;    
};

export const UserToken = () => {
const data = localStorage.getItem('userInfo')
const userData =JSON.parse(data);
return userData.token;    
};