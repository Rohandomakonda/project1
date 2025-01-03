package com.project.view_serivce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ViewSerivceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ViewSerivceApplication.class, args);
	}

}
