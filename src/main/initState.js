import { get } from 'assets/js/http';
import * as api from 'constants/api';
// import reducer from 'reducers/merchantInfo';
// import * as actionTypes from 'constants/actionTypes';
// import sidebarPaths from 'constants/sidebar';
// import menuConfig from 'constants/menu';

function setSidebarPath(menu) {
    const menuItems = menu.map((item) => {
        if (Array.isArray(item.children)) {
            return {
                ...item,
                children: item.children.map(m => ({
                    ...m,
                    path: sidebarPaths[m.id]
                }))
            };
        }

        return {
            ...item,
            path: sidebarPaths[item.id]
        };
    });

    return menuConfig.reduce((pre, mc) => {
        if (!Array.isArray(mc.sidebar)) {
            const item = menuItems
                .reduce((pre, cur) => pre.concat(cur.children || [cur]), [])
                .find(m => m.id === mc.id);

            if (!item) {
                return pre;
            }

            return [...pre, { ...mc, path: item.path }];
        }

        const children = menuItems.filter(m => mc.sidebar.find(id => id === m.id));

        if (children.length > 0) {
            return [...pre, { ...mc, children }];
        }

        return pre;
    }, []);
}

export default async function initializeState() {
    // const {
    //     uid,
    //     username,
    //     displayname,
    //     roleName,
    //     roleMenu,
    //     merchantInfo,
    //     merchantList,
    //     roleFunc
    // } = await get(api.ACCOUNT_INFO);

    // const user = {
    //     uid,
    //     username,
    //     displayname,
    //     roleName,
    //     permissionList: roleFunc
    // };

    // const menu = setSidebarPath(roleMenu);

    // const merchantInfoStates = reducer(merchantInfo, {
    //     type: actionTypes.MEMBER_RULES_INFO,
    //     payload: merchantInfo.memberInfo
    // });

    // return { user, menu, merchantList, merchantInfo: merchantInfoStates };

    const user = {
        username: '商户管理员',
        displayname: '泡泡堂网吧'
    }

    const menu = [
        {
            id: 1,
            name: '商户管理'
        },
        {
            id: 2,
            name: '商品管理'
        },
        {
            id: 3,
            name: '商品分类管理'
        }
    ]

    return { user, menu };
}
