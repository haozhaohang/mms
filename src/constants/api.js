const prefix = '/api';

// 登陆
export const ACCOUNT_LOGIN = `${prefix}/site/login`

// 图片上传
export const UPLOAD_FILE = `${prefix}/home/upload`

// 基础信息
export const ACCOUNT_INFO = `${prefix}/home/index`

// 门店管理
export const MERCHANT_LIST = `${prefix}/merchant/clist`
export const MERCHANT_INFO = `${prefix}/merchant/info`
export const MERCHANT_ADD = `${prefix}/merchant/create`
export const MERCHANT_UPDATE = `${prefix}/merchant/update`
export const MERCHANT_ON_STATUS = `${prefix}/merchant/on`
export const MERCHANT_OFF_STATUS = `${prefix}/merchant/off`

// 订单管理
export const ORDER_LIST = `${prefix}/order/clist`
export const ORDER_REFUND = `${prefix}/order/refund`
export const ORDER_PRINT = `${prefix}/order/repeat-print`

// 商品分类管理
export const CATEGORY_LIST = `${prefix}/category/clist`
export const CATEGORY_INFO = `${prefix}/category/info`
export const CATEGORY_ADD = `${prefix}/category/create`
export const CATEGORY_UPDATE = `${prefix}/category/update`
export const CATEGORY_ON_STATUS = `${prefix}/category/on`
export const CATEGORY_OFF_STATUS = `${prefix}/category/off`

// 单品管理
export const GOODS_LIST = `${prefix}/goods/clist`
export const GOODS_ON_STATUS = `${prefix}/goods/on`
export const GOODS_OFF_STATUS = `${prefix}/goods/off`
export const GOODS_INFO = `${prefix}/goods/info`
export const GOODS_ADD = `${prefix}/goods/add`
export const GOODS_UPDATE = `${prefix}/goods/update`