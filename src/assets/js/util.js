export function equalByProps(obj1, obj2, props) {
    return props.some(prop => obj1[prop] !== obj2[prop]);
}

export const actionCreator = type => payload => ({ type, payload });

export const phoneReg = /^1[34578]\d{9}$/;
