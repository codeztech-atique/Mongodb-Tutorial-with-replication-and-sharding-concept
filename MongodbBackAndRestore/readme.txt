# Mongodb Backup and Restore


Go to your terminal -- >

1. mongod
2. Open robotT to check the connection


# Mongodb dumping entire all database and Restore

1. mongodump ---- for dumping the databse
2. delete all the database from robotT 
3. mongorestore --- for restoring the databse

# Mongodb dumping single database and Restore

1. mongodump --db mongodbTutorial
2. delete database mongodbTutorial from robotT || db.databaseName.drop()
3. mongorestore

# Mongodb dumping single collection and Restore single collection

1. mongodump --db mongodbTutorial --collection school
2. delete the collection from the perticular database from robotT || db.collectionName.drop()
3. mongorestore --db mongodbTutorial --collection school dump/mongodbTutorial/school.bson



