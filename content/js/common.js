//获取token
const GetToken = () => {
    const url = window.location.href;
    const regToken = /(?<=token=)[^&]+/g;
    const token = url.match(regToken);
    return token.toString();
};

