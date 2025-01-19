const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? (page - 1) * limit : 0;

    return {limit, offset};
}

const getPagingData = (db_res_data, page, limit) => {
    const {count: total_items, rows: data} = db_res_data;
    const current_page = page ? +page : 1;
    const total_pages = Math.ceil(total_items/limit);

    return {total_items, data, total_pages, current_page};
}

module.exports = {getPagination, getPagingData}