import * as server from './_base'

export function test(params) {
    return server.fetchGet('/', params);
}

export function checkStudent(params) {
    return server.fetchPost('/api/guest/get/student', params);
}

export function submitStudent(params) {
    return server.fetchPost('/api/guest/set/student', params);
}