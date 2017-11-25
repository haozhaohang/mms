import * as api from 'constants/api';
import { LOGIN_URL, PERMISSION } from 'constants/basic';
import { get, post } from 'assets/js/request';

// export function logout() {
//     return async () => {
//         try {
//             await get(ACCOUNT_LOGOUT);
//         } catch (e) {
//             return;
//         }

//         location.href = LOGIN_URL;
//     };
// }

// export function checkPermission(pis) {
//     return (dispatch, getState) => {
//         const { permissionList } = getState().user;
//         const permission = typeof pis === 'number' ? pis : PERMISSION[pis];

//         return permissionList.indexOf(permission) !== -1;
//     };
// }

// 登陆页面使用
export function login(params) {
    return post(
        api.ACCOUNT_LOGIN,
        params,
        {
            showErrorMsg: false,
            needLoading: false
        }
    );
}

