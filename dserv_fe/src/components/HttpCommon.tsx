import Axios from 'axios';

const axiosBaseURL = Axios.create({
    baseURL:'http://localhost:8080/'
});
export default axiosBaseURL