FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
copy --from=build /target/weather_site-0.0.1-SNAPSHOT.jar weather_site.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "weather_site.jar"]