FROM registry.access.redhat.com/ubi8/openjdk-11:latest

COPY apigateway/target/*.jar /deployments/spring-boot-application.jar
