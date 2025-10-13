require("dotenv").config();
const connectDB = require("./database/connection");
const { port, isProduction } = require("./constants");
const cluster = require("cluster");
const os = require("os");
const { setupMaster, setupWorker } = require("@socket.io/sticky");
const createApp = require("./app");

// Total CPU Cores
const totalCPUS = os.cpus().length;

// Clusterization
if(isProduction && cluster.isPrimary)
{
    console.log(`Primary process ${process.pid} is running`);
    console.log(`Spawning ${totalCPUS} worker processes...`);

    // Attach sticky session master handler in production environemnt
    const { server } = createApp();
    setupMaster(server, { loadBalancingMethod: "header", headerName: "x-forwarded-for" });

    // Spawn workers
    for(let i = 0; i < totalCPUS; i++) cluster.fork();

    // Restart dead workers
    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} 
else 
{
    // Worker setup
    connectDB()
    .then(() => {
        // Attach sticky worker handler in production environemnt
        const { server, io } = createApp();
        if(isProduction) setupWorker(io);
        server.on("error", (error) => console.log(`Express app failed to listen! ${error}`));
        server.listen(port, () => console.log(`Server running on port:${port} | PID: ${process.pid}`));
    })
    .catch((error) => console.log(`Database connection failed in worker ${process.pid}: ${error.message}`));
}