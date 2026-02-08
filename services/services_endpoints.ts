export const useServicesEntries = () => {
    // const apiEntry = "http://192.168.60.39:8000/api/v1";
    const apiEntry = "http://192.168.100.98:8000/api/v1";
    // const apiEntry = "http://192.168.182.153:8000/api/v1";
    const notificationWS = "ws://192.168.100.98:8000/ws/notifications/"
    // const apiEntry = "https://civiccaremanagementsystem.onrender.com/api/v1"
    return {
        "notificationWS": notificationWS,
        "notifications": `${apiEntry}/notifications`,
        'searchIssue':  `${apiEntry}/issues`,
        'getCurrentUserProfile': `${apiEntry}/user/me/`,
        'getIssueType': `${apiEntry}/issue_types`,
        'getIssuesEntry': `${apiEntry}/issues`,
        'createIssuesEntry': `${apiEntry}/`,
        'signupEntry': `${apiEntry}/user/signup/`,
        'loginEntry': `${apiEntry}/user/login/`,
        'mediaEntry': (mediaId: number) =>
            `${apiEntry}/issues/serve_attachment/?id=${mediaId}`,
        'refreshTokenEntry': `${apiEntry}/user/token/refresh/`,
    }
}
