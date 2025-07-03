package com.project.auth_service;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;


@SpringBootApplication
@EnableFeignClients
public class AuthServiceApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();

		// Load all variables into system properties
		dotenv.entries().forEach(entry ->
				System.setProperty(entry.getKey(), entry.getValue())
		);

		SpringApplication.run(AuthServiceApplication.class, args);
	}

}
