mkdir -p rshard7 rshard8 rshard9
mongod --replSet shard3 --logpath "7.log" --dbpath rshard7 --port 47017 --fork --shardsvr --smallfiles &
mongod --replSet shard3 --logpath "8.log" --dbpath rshard8 --port 47018 --fork --shardsvr --smallfiles &
mongod --replSet shard3 --logpath "9.log" --dbpath rshard9 --port 47019 --fork --shardsvr --smallfiles &