# DAVe sample stack


DAVe __should be__ installed and operated via [helm chart](https://artifacthub.io/packages/helm/it-at-m/dave?modal=install).

But for a basic peek or development environments on what DAVe has to offer, we provide a [docker-compose](https://github.com/it-at-m/dave-backend/blob/sprint/stack/docker-compose.yml) file that starts up the following components:

* ElasticSearch
* Kibana
* Postgres Database
* PgAdmin

When this infrastructure is up and running, basis configuration is needed to start DAVE [dave-backend](https://github.com/it-at-m/dave-backend) 
and [dave-frontend](https://github.com/it-at-m/dave-frontend) to see a sample counting station with a sample count 
imported into the database and index.
Afterwards you can inspect the sample data in the DAVe UI.

Here are the steps to install the necessary stack to run the application:

1. Install Docker and Docker Compose: You need to have Docker and Docker Compose installed on your system. 
If you don't have them installed, you can follow the official documentation to install them. 
You can use the following commands to check if they are installed:
```
docker --version
docker compose --version
```
Alternatively, you can use [Podman](https://podman.io/) instead of Docker.

2. Start the infrastructure: After the images are built, you can start the containers by running the following command in the terminal:
```
docker compose up
```

3. Get the elasticsearch certificate: Follow the instructions in [stack README](https://github.com/it-at-m/dave-backend/blob/sprint/stack/readme.md#erzeugen-des-fingerprints) 
on how to obtain the certificate fingerprint from elasticsearch. 
Then add it as environment variable ELASTICSEARCH_CERT_FINGERPRINT in the [.env-File](https://github.com/it-at-m/dave-frontend/blob/sprint/stack/.env)
and source the file:
```
source stack/.env
```

4. Startup backend and frontend: Navigate to the frontend stack directory and run compose:
```
cd stack
docker compose up
```

5. Access the application: Once the containers are up and running, you can access DAVe UI
by navigating to http://localhost:8082 in your web browser.

That's it! You have successfully installed and started the application stack for DAVe.
