import * as server from './_base'

export function test(params) {
    return server.fetchGet('/', params);
}

// 管理员登陆
export function login(params) {
    return server.fetchPost('/api/admin/login', params);
}

// 管理员注销
export function logout(params) {
    return server.fetchPost('/api/admin/logout', params);
}

// 获取表格文件列表
export function getFileList(params) {
    return server.fetchPost('/api/admin/get/files', params);
}

// 获取表格文件详细信息
export function getFile(params) {
    return server.fetchPost('/api/admin/get/file', params);
}

// 获取课堂列表
export function getLessonList(params) {
    return server.fetchPost('/api/class/list', params);
}

// 获取课堂信息
export function getLesson(params) {
    return server.fetchPost('/api/class/find', params);
}

export function setLesson(params) {
    return server.fetchPost('/api/admin/set/lesson', params);
}

// 获取学员列表
export function getStudentList(params) {
    return server.fetchPost('/api/get/students', params);
}

// 获取学员信息
export function getStudent(params) {
    return server.fetchPost('/api/admin/get/student', params);
}

// 更新学员信息
export function setStudent(params) {
    return server.fetchPost('/api/admin/set/student', params);
}

// 添加至少一个学员
export function AddStudents(params) {
    return server.fetchPost('/api/admin/add/students', params);
}

// 删除至少一个学员
export function delStudents(params) {
    return server.fetchPost('/api/admin/del/students', params);
}

// 上传表格文件
export function uploadFile(params) {
    return server.fetchPost('/api/admin/upload/file', params);
}

// 删除表格文件
export function delectFile(params) {
    return server.fetchPost('/api/admin/delete/file', params);
}

// 下载表格文件
export function downloadFile(params) {
    return server.fetchPost('/api/admin/download/file', params);
}

// 导出课堂学员列表
export function exportLession(params) {
    return server.fetchPost('/api/admin/export/tables', params);
}
// 导出选定数据
export function exportJson(params) {
    return server.fetchPost('/api/admin/export/json', params);
}

// 获取管理员登陆页面
export function getAdminQrCode(params) {
    return server.fetchPost('/api/admin/get/server/qrcode', params);
}

// 更新程序配置
export function setAppConfig(params) {
    return server.fetchPost('/api/admin/set/app/config', params);
}

// 初始化系统
export function initSystem(params) {
    return server.fetchPost('/api/admin/init/system', params);
}

// 更新管理员信息
export function updateAdmin(params) {
    return server.fetchPost('/api/admin/update/info', params);
}

// 重置管理员密码
export function initAdminPassword(params) {
    return server.fetchPost('/api/admin/init/password', params);
}

// 清理缓存
export function clearSystem(params) {
    return server.fetchPost('/api/admin/clear/system', params);
}
