import logger from "../logger.js"

export const getSignIn = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/productos");
        logger.info(`Session confirmed`);
    };
    res.render("ingresar");
    logger.info(`Session not found`);
};

export const getSignUp = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/productos");
        logger.info(`Session confirmed`);
    };
    res.render("registrarse");
    logger.info(`Session not found`);
};

export const getLogout = (req, res) => {
    const usuario = req.user.username;
    req.logout(err => {
        const saludo = `Hasta luego ${usuario}`;
        logger.info(`Gracias, vuelvas prontos`);
        res.render("Saludo", {saludo});
    });
};