// Function that returns the options for ordering
// It requires as a parameter the object "ordenamiento" that is returned from the function getDataFromCMS.
// It returns a list of objects = {order_id, order_way, label}

const parseOrderOptions = (data) => {
    try {
        const orderOptions = data.map(options => {
            const { label } = options
            const [order_id, order_way] = options.order.split('-');
            return ({label, order_id, order_way})
        })
        return orderOptions;

    } catch (err) {
        console.log(err);
        return []
    }
}

export default parseOrderOptions;