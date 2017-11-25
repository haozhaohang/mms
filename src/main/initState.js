import { get } from 'assets/js/http';
import * as api from 'constants/api';
// import reducer from 'reducers/merchantInfo';
// import * as actionTypes from 'constants/actionTypes';
import sidebarPaths from 'constants/sidebar';
// import menuConfig from 'constants/menu';

function setSidebarPath(menu) {
    const menuItems = menu.map((item) => {
        if (Array.isArray(item.children)) {
            console.log(item)
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

function setSidebarPath(menu) {
    const menuItems = menu.map((item) => {
        if (Array.isArray(item.chidren)) {
            return {
                ...item,
                chidren: item.chidren.map(m => ({
                    ...m,
                    path: sidebarPaths[m.id]
                }))
            };
        }
    });

    return menuItems
}

export default async function initializeState() {
    const {
        menu,
        user_info
    } = await get(api.ACCOUNT_INFO);



    const newMenu = setSidebarPath(menu);
    // const merchantInfoStates = reducer(merchantInfo, {
    //     type: actionTypes.MEMBER_RULES_INFO,
    //     payload: merchantInfo.memberInfo
    // });

    // return { user, menu, merchantList, merchantInfo: merchantInfoStates };

    return { menu: newMenu, user: user_info };
}
