package com.project.auth_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerificationRequest {
    @NotBlank
    @Email
    private String email;

    public @NotBlank @Email String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank @Email String email) {
        this.email = email;
    }

    public @NotBlank String getOtp() {
        return otp;
    }

    public void setOtp(@NotBlank String otp) {
        this.otp = otp;
    }

    @NotBlank
    private String otp;
}