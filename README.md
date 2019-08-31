# me-jwt-authentication

## How to run

Before starting make sure that MongoDB is running

```
npm start
```

## How to run MongoDB

After downloading Mongo move the gzipped tar file (the file with the extension .tgz that you downloaded) to the folder where you want Mongo installed. In this case, we’ll say that we want Mongo to live in our home folder, and so the commands might look something like this:

```
cd Downloads

mv mongodb-osx-x86_64-3.0.7.tgz ~/
```

Extract MongoDB from the the downloaded archive, and change the name of the directory to something more palatable:

```
cd ~/ > tar -zxvf mongodb-osx-x86_64-3.0.7.tgz > mv mongodb-osx-x86_64-3.0.7 mongodb
```

Create the directory where Mongo will store data, create the “db” directory. ou can create the directory in the default location by running mkdir -p /data/db
Make sure that the /data/db directory has the right permissions by running

```
sudo chown -R `id -un` /data/db
```

Run the Mongo daemon, in one terminal window run 

```
~/mongodb/bin/mongod. This will start the Mongo server
```
Run the Mongo shell, with the Mongo daemon running in one terminal, type

```
~/mongodb/bin/mongo in another terminal window
```
 
 This will run the Mongo shell which is an application to access data in MongoDB.
To exit the Mongo shell run __quit()__
To stop the Mongo daemon hit __ctrl-c__