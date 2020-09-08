import {app} from "./app";
import {Logger} from "tslog";
const log: Logger = new Logger();
const port = 3333
app.listen(port, () => {
    log.debug('Listening on port: ' + port)
})