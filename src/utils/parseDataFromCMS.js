// Function that returns the url to fetch movies and the options for ordering
// It requires as a parameter the data that is returned from the call to the CMS
// It returns an object = {url, ordenamiento}
// If the function doesn't find nor the url nor the order options, it returns {url: null, ordenamiento: null}

const parseDataFromCMS = (data) => {
    try {
        const componentList = data.response.modules.module[0].components.component
        const carrousel = componentList.find(component => component.type === "Listadoinfinito")
        const url = carrousel?.properties?.url;
        const ordenamiento = carrousel?.properties?.ordenamiento;
        return {url, ordenamiento}

    } catch (err) {
        console.error(err);
        return {url: null, ordenamiento: null}
    }
}

export default parseDataFromCMS;