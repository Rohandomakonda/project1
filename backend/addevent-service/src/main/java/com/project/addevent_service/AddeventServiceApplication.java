package com.project.addevent_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class AddeventServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AddeventServiceApplication.class, args);
	}

}
