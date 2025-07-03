package com.project.auth_service.feign;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name="NOTIFICATION-SERVICE",url="https://notification-service-7dvl.onrender.com")
public interface NotificationClient {


}
