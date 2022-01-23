import claroClient from "./config/claroClient";

const path = 'services/content/data'
const configParams = new URLSearchParams("device_id=web&device_category=web&device_model=web&device_type=web&format=json&device_manufacturer=generic&authpn=webclient&authpt=tfg1h3j4k6fd7&api_version=v5.86&region=mexico&HKS=9s5hqq76r3g6sg4jb90l38us52&user_id=22822863")

const getMovieById = (movieId) => {
    const paramsToFetch = new URLSearchParams(configParams);

    paramsToFetch.append('group_id', movieId)
    
    const urlToFetch = `${path}?${paramsToFetch.toString()}`
    
    return claroClient.get(urlToFetch)
    .then(response => response.data)
    .catch(error => Promise.reject(error));
}

export default getMovieById;