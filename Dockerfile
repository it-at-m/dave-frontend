# For documentation see https://jboss-container-images.github.io/openjdk/
FROM registry.access.redhat.com/ubi9/openjdk-21-runtime:latest

COPY apigateway/target/*.jar /deployments/spring-boot-application.jar
