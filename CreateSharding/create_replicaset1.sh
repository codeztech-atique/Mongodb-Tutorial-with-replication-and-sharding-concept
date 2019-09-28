mkdir -p rshard1 rshard2 rshard3
mongod --replSet shard1 --logpath "1.log" --dbpath rshard1 --port 27017 --fork --shardsvr --smallfiles &
mongod --replSet shard1 --logpath "2.log" --dbpath rshard2 --port 27018 --fork --shardsvr --smallfiles &
mongod --replSet shard1 --logpath "3.log" --dbpath rshard3 --port 27019 --fork --shardsvr --smallfiles &