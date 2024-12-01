package com.project.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your OTP for Email Verification");
        message.setText("Your OTP is: " + otp + "\nThis OTP will expire in 5 minutes.");
        mailSender.send(message);
    }


    public void sendEmail(String email, String newEventAdded, String s) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(newEventAdded);
        message.setText(s);
        mailSender.send(message);
    }


}
