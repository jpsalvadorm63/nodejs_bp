import cluster from "cluster" ;
import os from "os" ;

const CPUS = os.cpus() ;

if(cluster.isMaster) {
    CPUS.forEach( () => cluster.fork() ) ;

    cluster.on("listening", worker => {
       console.log("Cluster %d connected", worker.process.id);
    });

    cluster.on("disconnect", worker => {
        console.log("Cluster %d disconnected", worker.process.id);
    });

    cluster.on("exit", worker => {
        console.log("Cluster %d is off", worker.process.id);
        cluster.fork(); // ensure start of a new cluster if an old one dies
    });
} else {
    require("./index.js");
}
