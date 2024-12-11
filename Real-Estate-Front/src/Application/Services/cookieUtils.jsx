import Cookies from 'js-cookie';
import axios from 'axios';
 
const cookieUtils = {
  setUserRoleInCookies: (role) => {
    Cookies.set('userRole', role, { expires: 1 });
  },
  setUserIdInCookies: (userId) => {
    Cookies.set('userId', userId, { expires: 1 });
  },
  setNameInCookies: (name) => {
    Cookies.set('name', name, { expires: 1 });
  },
  getUserIdFromCookies: () => {
    return Cookies.get('userId');
  },
  getUserRoleFromCookies: () => {
    return Cookies.get('userRole');
  },
  getNameFromCookies: () => {
    return Cookies.get('name');
  },
  clearUserRole: () => {
    Cookies.remove('userRole');
    Cookies.remove('userId');
    Cookies.remove('name');
    Cookies.remove('refreshToken');
  }
};
 
export default cookieUtils;