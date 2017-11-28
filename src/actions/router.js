import URI from 'urijs';
import { push, replace } from 'react-router-redux';

export function replaceQuery(query, replaceHistory = false) {
    return (dispatch, getState) => {
        const { location } = getState().router;
        const search = URI.buildQuery(query);

        const newLocation = {
            ...location,
            search: search ? `?${search}` : ''
        };

        const method = replaceHistory ? replace : push;

        dispatch(method(newLocation));
    };
}

export function updateQuery(newQuery, replaceHistory = false) {
    return (dispatch, getState) => {
        const { location } = getState().router;
        const query = URI.parseQuery(location.search);

        const search = URI.buildQuery({
            ...query,
            ...newQuery
        });

        const newLocation = {
            ...location,
            search: search ? `?${search}` : ''
        };

        const method = replaceHistory ? replace : push;

        dispatch(method(newLocation));
    };
}

