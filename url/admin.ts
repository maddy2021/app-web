export const LOGIN = "/api/v1/auth/login"

export const COMMODITY_GETALL = "/api/v1/commodity/getall"
export const COMMODITY_CREATE = "/api/v1/commodity/"
export const COMMODITY_GETBYID = "/api/v1/commodity/"
export const COMMODITY_UPDATE = "/api/v1/commodity/update"

export const PERMISSION_GETALL = "/api/v1/permission/getall"
export const PERMISSION_CREATE = "/api/v1/permission/"
export const PERMISSION_GETBYID = "/api/v1/permission/getById/"
export const PERMISSION_UPDATE = "/api/v1/permission/update"

export const ROLE_GETALL = "/api/v1/role/getall"
export const ROLE_CREATE = "/api/v1/role/"
export const getRoleCraeteURL = (id: string) => {
    return `/api/v1/role/${id}/permission`
}
export const ROLE_GETBYID = "/api/v1/role/getById/"
export const ROLE_UPDATE = "/api/v1/role/update"

export const SUBSCRIBER_GETALL = "/api/v1/subscriber/getall"
export const SUBSCRIBER_CREATE = "/api/v1/subscriber/"
export const getSubscriberCommodities = (id: string) => {
    return `/api/v1/subscriber/${id}/commodity`
}
export const getSubCommNotassociate = (id: string) => {
    return `/api/v1/subscriber/${id}/commodity/notassociate`
}
export const getSubscriberUser = (id: string) => {
    return `/api/v1/subscriber/${id}/user`
}
export const getSubUserNotassociate = (id: string) => {
    return `/api/v1/subscriber/${id}/user/notassociate`
}
export const SUBSCRIBER_GETBYID = "/api/v1/subscriber/getById/"
export const SUBSCRIBER_UPDATE = "/api/v1/subscriber/update"

export const USER_GETALL = "/api/v1/user/getall"
export const USER_CREATE = "/api/v1/user"
export const getUserRole = (id: string) => {
    return `/api/v1/user/${id}/role`
}
export const getUserRoleNotassociate = (id: string) => {
    return `/api/v1/user/${id}/role/notassociate`
}
export const USER_GETBYID = "/api/v1/user/getById/"
export const USER_UPDATE = "/api/v1/user/update"
export const USER_GET_PERMISSION = "/api/v1/user/getpermission"

export const GET_MODULE = "/api/v1/module/getall"

export const getSubscriberLookahead = (id: string) => {
    return `/api/v1/subscriber/${id}/lookahead`
}

export const getSubLookaheadNotassociate = (id: string) => {
    return `/api/v1/subscriber/${id}/lookahead/notassociate`
}