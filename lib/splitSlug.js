export default (slug, index) => {
    if(index === 0) {
        return slug.split("__")[0] !== undefined ? slug.split("__")[0] : "/"
    } else if (index === 2) {
        return slug.split("__")[2] !== undefined ? slug.split("__")[2] : "/"
    } else if (index === 3) {
        return slug.split("__")[3] !== undefined ? slug.split("__")[3] : "/"
    } else {
        return "/"
    }
}