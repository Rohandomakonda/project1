package com.project.auth_service.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class NotificationRequest {
   private String userEmail;
   private String otp;

   public NotificationRequest(String email, String otp) {
      this.userEmail=email;
      this.otp=otp;
   }
}
