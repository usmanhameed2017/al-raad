require("dotenv").config();
const connectDB = require("./database/connection");
const { port } = require("./constants");
const { server } = require("./app");
const cluster = require("cluster");
const os = require("os");

// Total CPU cores
const totalCPUS = os.cpus().length;

// Clusterization
if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);
    console.log(`Spawning ${totalCPUS} worker processes...`);

    for (let i = 0; i < totalCPUS; i++) 
    {
        cluster.fork();
    }

    // If worker dies
    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} 
else 
{
    connectDB()
    .then(() => {
        server.on("error", (error) => console.log(`Express app failed to listen! ${error}`));
        server.listen(port, () => console.log(`Server running on port:${port} | PID: ${process.pid}`));
    })
    .catch((error) => console.log(`Database connection failed in worker ${process.pid}: ${error.message}`));
}