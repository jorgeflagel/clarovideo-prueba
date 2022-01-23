import claroClient from "./config/claroClient";

const path = 'services/content/list'
const configParams = new URLSearchParams("api_version=v5.86&authpn=webclient&authpt=tfg1h3j4k6fd7&format=json&region=mexico&device_id=web&device_category=web&device_model=web&device_type=web&device_manufacturer=generic&HKS=9s5hqq76r3g6sg4jb90l38us52&isCacheable=true&domain=https%3A%2F%2Fmfwkweb-api.clarovideo.net%2F&origin=https%3A%2F%2Fwww.clarovideo.com%2F&user_id=22822863")

const getMovieListByGenreId = (genreId, params = {}) => {
    const paramsToFetch = new URLSearchParams(configParams);

    paramsToFetch.append('filter_id', genreId)
    paramsToFetch.append('order_way', params.order_way || 'ASC')
    paramsToFetch.append('order_id', params.order_id || 50)
    paramsToFetch.append('quantity', params.quantity || 50)
    paramsToFetch.append('from', params.from || 0)

    const urlToFetch = `${path}?${paramsToFetch.toString()}`
    
    return claroClient.get(urlToFetch)
    .then(response => response.data)
    .catch(error => Promise.reject(error));
}

export default getMovieListByGenreId;