config = { _id: "shard2", members:[
    { _id: 0, host : "localhost:37017" },
    { _id: 1, host : "localhost:37018" },
    { _id: 2, host : "localhost:37019" } ]
};
rs.initiate(config);
rs.status();