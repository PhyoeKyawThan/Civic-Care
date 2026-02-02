export const useServicesEntries = () => {
    // const apiEntry = "http://192.168.100.49:8000/api/v1";
    const apiEntry = "http://192.168.100.53:8000/api/v1";
    // const apiEntry = "https://civiccaremanagementsystem.onrender.com/api/v1"
    return {
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
