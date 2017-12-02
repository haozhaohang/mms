import { get } from 'assets/js/http';
import * as api from 'constants/api';
import sidebarPaths from 'constants/sidebar';

function setSidebarPath(menu) {
    const menuItems = menu.map((item) => {
        if (Array.isArray(item.chidren)) {
            return {
                ...item,
                chidren: item.chidren.map(m => ({
                    ...m,
                    path: (sidebarPaths[m.id] && sidebarPaths[m.id].path) || ''
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

    return { menu: newMenu, user: user_info };
}
