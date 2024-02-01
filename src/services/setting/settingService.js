import Http from '../../Http'
const BaseUrl = process.env.REACT_APP_BASE_URL;

export function getContactList() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/common/listContactus')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function addSupportEmailMobile(data) {
    data.env = 'test';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/addEditContact', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getCms() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getCMS')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function getStates() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getStates')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function updateStateDetails(data) {
    console.log(data, "123456978");
    data.env = "test"
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/updateStateDetail', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function getPromoCode() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/promocode')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function updatePromoCode(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + `/admin/changepromocodestatus?id=${data?._id}`)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function addCms(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/addCMS', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function getRifleSeasons() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getseason')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function getlateseason(e) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + `/admin/getlateseason?id=${e}`)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function addRifle(data) {
    data.env = "test"
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/addseason', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function updateRifle(data) {
    data.env = "test"
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + `/admin/updateseason?id=${data?.id}`, data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function deleterifleseason(data) {
    data.env = "test"
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/deleteSeasons', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}