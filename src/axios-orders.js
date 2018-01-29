import axios from 'axios';

export default axios.create({
  baseURL: 'https://my-react-burger-bc71f.firebaseio.com/'
});
