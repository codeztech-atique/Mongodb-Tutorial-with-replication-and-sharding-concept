Steps: - 
First chmod u+x create_replicaset.sh -- Give the permission to your file
1. run script from the terminal - ./create_replicaset.sh
2. ps -ef | grep mongod
3. You can see 3 directory is created. Then run your mongo.
4. Follow the steps from the file init_mongoreplica.js
5. ps -ef | grep mongod -- To check what all port mongod occupied. And we are going to kill primary one.
6. For kill primary command - kill <PID> then check the status once again %ps -ef | grep mongod
7. To connect the mongodb you can't connect like by saying mongod from your terminal you have follow the 8 no steps
8. mongo --host atique/localhost:27017,localhost:27018,localhost:27019,localhost:27020
9. rs.status()  ---- to check the status
10. open robo mongo to see the data, also if you want to can open robo shell and run rs.status() to see the status