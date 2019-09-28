mkdir -p rs1 rs2 rs3 rs4
mongod --replSet atique --logpath "1.log" --dbpath rs1 --port 27017 &
mongod --replSet atique --logpath "2.log" --dbpath rs2 --port 27018 &
mongod --replSet atique --logpath "3.log" --dbpath rs3 --port 27019 &
mongod --replSet atique --logpath "4.log" --dbpath rs4 --port 27020 &