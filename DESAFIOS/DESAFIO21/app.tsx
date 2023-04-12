import { 
    Req, 
    Res, 
    Router, 
    WebApp 
} from "https://deno.land/x/denorest@v3.1/mod.ts";

const app = new WebApp();
const router = new Router();


router.get("/", (_req: Req, res: Res) => {
    res.headers = {
        "Content-Type": "text/html",
    };
    res.reply = `<h1 style="background-color:${_req.url.search.substring(1)};" > Hola, mi servidor en Deno </h1>`
});


app.set(router);
app.listen(8080);
