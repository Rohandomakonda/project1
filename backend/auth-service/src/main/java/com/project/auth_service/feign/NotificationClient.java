package com.project.auth_service.feign;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name="NOTIFICATION-SERVICE")
public interface NotificationClient {


}
