import app from "./index.js";
import {connectToMongoDB} from "./src/config/mongodb.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";

app.listen(3700,()=>{
    console.log("App is listening to port 3700");
    // connectToMongoDB();
    connectUsingMongoose();
})