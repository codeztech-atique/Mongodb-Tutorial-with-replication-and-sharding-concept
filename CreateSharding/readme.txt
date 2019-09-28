# script to start a sharded environment on localhost

# clean everything up
echo "killing mongod and mongos"
killall mongod
killall mongos
echo "removing data files"
sudo rm -rf /data/config
sudo rm -rf /data/shard*


Steps: - 
First chmod u+x create_replicaset1.sh create_replicaset2.sh create_replicaset3.sh  -- Give the permission to your file
1. run script from the terminal - ./create_replicaset1.sh
2. ps -ef | grep mongod -------> mongo --port 27017 -------> for the first replicaset and execute init_mongoreplica1.js
3. run script from the terminal - ./create_replicaset2.sh
4. ps -ef | grep mongod -------> mongo --port 37017 -------> for the second replicaset and execute init_mongoreplica2.js
5. run script from the terminal - ./create_replicaset3.sh 
6. ps -ef | grep mongod -------> mongo --port 47017 -------> for the third replicaset and execute init_mongoreplica3.js

# now start 3 config servers below these guyz will decide what shardkey will go where
echo "Starting config servers"

sudo mkdir -p /data/config/config-a /data/config/config-b /data/config/config-c

sudo mongod --logpath "cfg-a.log" --dbpath /data/config/config-a --replSet conf --port 57040 --fork --configsvr --smallfiles
sudo mongod --logpath "cfg-b.log" --dbpath /data/config/config-b --replSet conf --port 57041 --fork --configsvr --smallfiles
sudo mongod --logpath "cfg-c.log" --dbpath /data/config/config-c --replSet conf --port 57042 --fork --configsvr --smallfiles

# If your mongo version > 3.2 then follow below steps (currently my mongo version 4.3)

mongo --port 57040

#then copy the below command  --replSet conf (if its conf we need to name it to __id: "conf")

config = { _id: "conf", members:[
    { _id : 0, host : "localhost:57040" },
    { _id : 1, host : "localhost:57041" },
    { _id : 2, host : "localhost:57042" }]
};

rs.initiate(config);

mongos --configdb conf/localhost:57040,localhost:57041,localhost:57042 --logpath "mongos-1.log" --port 21010 (you can change ur port as per you want)

wait for 60-120 sec to make the setup background then go and type new terminal - 

mongo --port 21010

Then Execute - 

db.adminCommand( { addshard : "shard1/"+"localhost:27017" } );
db.adminCommand( { addshard : "shard2/"+"localhost:37017" } );
db.adminCommand( { addshard : "shard3/"+"localhost:47017" } );
db.adminCommand({enableSharding: "school"})
use school
db.adminCommand({shardCollection: "school.students", key: {student_id:1}});
show collections
use students

db.students.insert({id:12, name:"Atique Ahmed", class:"12", subject:"science"})
db.students.insert({id:13, name:"Sunny Khan", class:"11", subject:"arts"})
db.students.insert({id:14, name:"R Meheta", class:"10", subject:"science"})
db.students.insert({id:15, name:"Rohan Disuza", class:"12", subject:"arts"})
db.students.insert({id:16, name:"Anup Mohoan", class:"12", subject:"science"})
db.students.insert({id:17, name:"Kartik S", class:"12", subject:"commerce"})
db.students.insert({id:18, name:"Vineet Nair", class:"11", subject:"commerce"})
db.students.insert({id:19, name:"Parth joshi", class:"10", subject:"arts"})
db.students.insert({id:20, name:"Robin K", class:"11", subject:"science"})

db.students.find().pretty()

# If your mongo version <= 3.2 then follow below steps (currently my mongo version 4.3)


mkdir -p /data/config/config-a /data/config/config-b /data/config/config-c
mongod --logpath "cfg-a.log" --dbpath /data/config/config-a --port 57040 --fork --configsvr --smallfiles
mongod --logpath "cfg-b.log" --dbpath /data/config/config-b --port 57041 --fork --configsvr --smallfiles
mongod --logpath "cfg-c.log" --dbpath /data/config/config-c --port 57042 --fork --configsvr --smallfiles


# now start the mongos on a standard port
mongos --logpath "mongos-1.log" --configdb localhost:57040,localhost:57041,localhost:57042 --fork --port 21011  (don't close you window)


mongo --port 21011 (open new terminal and execute)


echo "Waiting 60 seconds for the replica sets to fully come online"
sleep 60
echo "Connnecting to mongos and enabling sharding"

# add shards and enable sharding on the test db
mongo <<'EOF'
db.adminCommand( { addshard : "s0/"+"localhost:37017" } );
db.adminCommand( { addshard : "s1/"+"localhost:47017" } );
db.adminCommand( { addshard : "s2/"+"localhost:57017" } );
db.adminCommand({enableSharding: "school"})
db.adminCommand({shardCollection: "school.students", key: {student_id:1}});

show collections
use students
db.students.insert({id:12, name:"Atique Ahmed", class:"12", subject:"science"})
db.students.insert({id:13, name:"Sunny Khan", class:"11", subject:"arts"})
db.students.insert({id:14, name:"R Meheta", class:"10", subject:"science"})
db.students.insert({id:15, name:"Rohan Disuza", class:"12", subject:"arts"})
db.students.insert({id:16, name:"Anup Mohoan", class:"12", subject:"science"})
db.students.insert({id:17, name:"Kartik S", class:"12", subject:"commerce"})
db.students.insert({id:18, name:"Vineet Nair", class:"11", subject:"commerce"})
db.students.insert({id:19, name:"Parth joshi", class:"10", subject:"arts"})
db.students.insert({id:20, name:"Robin K", class:"11", subject:"science"})

db.students.find().pretty()