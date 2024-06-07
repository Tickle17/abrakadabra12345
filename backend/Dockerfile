# Используем официальный образ Gradle с JDK 17 для этапа сборки
FROM gradle:8.5-jdk17 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle shadowJar --no-daemon --info --stacktrace

# Используем официальный образ OpenJDK 17 для запуска приложения
FROM openjdk:17
EXPOSE 8080
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/hachaton24.jar
ENTRYPOINT ["java", "-jar", "/app/hachaton24.jar"]
