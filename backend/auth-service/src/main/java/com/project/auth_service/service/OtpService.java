package com.project.auth_service.service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

@Service
public class OtpService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public String generateAndStoreOtp(String userEmail) {
        String otp = String.valueOf(new Random().nextInt(999999)); // Generate OTP
        String redisKey = "otp_" + userEmail;
        System.out.println(otp);
        redisTemplate.opsForValue().set(redisKey, otp, 5, TimeUnit.MINUTES); // Store with 5-min TTL
        return otp;
    }

    public boolean validateOtp(String userEmail, String inputOtp) {
        String redisKey = "otp_" + userEmail;
        String storedOtp = redisTemplate.opsForValue().get(redisKey);
        return inputOtp.equals(storedOtp);
    }
}

