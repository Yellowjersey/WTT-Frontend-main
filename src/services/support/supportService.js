import Http from '../../Http'
const BaseUrl = process.env.REACT_APP_BASE_URL;

export function getTicketList() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getSupportTicket')
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

export function getTicketDetail(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getTicketDetail/' + id)
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
export function getMessageList(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getMessages/' + id)
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
export function changeStatus(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/admin/supportchangeStatus/' + id)
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
export function changeaboutStatus(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/admin/aboutuschangeStatus/' + id)
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
export function changetutorialStatus(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/admin/changetutorialStatus/' + id)
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
export function ticketReply(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/sendMessage', data)
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
export function uploadCommonImage(data) {
    data.env = 'test';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/uploadImage/support', data)
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
export function getAboutUs() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getAboutUs')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        // errorData: error.response.data,
                        errorData: error.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function createabout(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/addAboutUs', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error)
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function updateabout(id, data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/admin/updateAboutUs/' + id, data)
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
export function getTutorial(id, data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getTutorial')
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

export function createTutorial(data) {
    data.env = 'test';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/createTutorial', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error)
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function updateTutorial(id, data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/admin/updateTutorial/' + id, data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error)
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}


export function getSeason(id, data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getlateseason')
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

export function getSeasons(id, data) {
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

export function createlateseason(data) {
    data.env = 'test';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/addlateseason', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error)
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function updatelateseason(id, data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/admin/updatelateseason?id=' + id, data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error)
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function deletelateseason(id) {
    const Id = id?.id
    console.log(Id);

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/admin/deletelateseason?id=' + Id)
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