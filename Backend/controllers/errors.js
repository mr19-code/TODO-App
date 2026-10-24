exports.pageNotFound = (req, res, next) => {
    res.status(404).json({massage: "Page not found"});
}
