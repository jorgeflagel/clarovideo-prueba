import claroClient from "./config/claroClient";

const path = "services/cms/level"
const params = "?api_version=v5.86&authpn=webclient&authpt=tfg1h3j4k6fd7&format=json&region=mexico&device_id=web&device_category=web&device_model=web&device_type=web&device_manufacturer=generic&HKS=9s5hqq76r3g6sg4jb90l38us52&isCacheable=true&domain=https%3A%2F%2Fmfwkweb-api.clarovideo.net%2F&origin=https%3A%2F%2Fwww.clarovideo.com%2F&user_id=22822863"

const getDataFromCMS = (genre) => {
    const paramsToFetch = new URLSearchParams(params);
    paramsToFetch.set('node', genre);

    const urlToFetch = `${path}?${paramsToFetch.toString()}`;

    return claroClient.get(urlToFetch)
        .then(response => response.data)
        .catch(error => Promise.reject(error));
}

export default getDataFromCMS;