export default class Page {
    static notFound(req, res) {
        return res.render("errors/404")
    }

    static errorPage(err, req, res) {
        return res.render("errors/500", { error: err.message })
    }

}