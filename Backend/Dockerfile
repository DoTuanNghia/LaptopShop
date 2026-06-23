## Build Stage
FROM maven:3.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

COPY . .

RUN mvn install -DskipTests

## Run Stage
FROM alpine/java:21-jdk

WORKDIR /run

COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar /run/demo-0.0.1-SNAPSHOT.jar

EXPOSE 8080

ENTRYPOINT java -jar /run/demo-0.0.1-SNAPSHOT.jar