package com.project.auth_service.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EmailReq {
    String email;

    public String getEmail() {
        return this.email;
    }
}
