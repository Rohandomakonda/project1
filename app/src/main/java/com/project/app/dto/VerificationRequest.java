package com.project.app.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerificationRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String otp;
}
