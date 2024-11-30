package com.project.app.service;


import com.project.app.model.User;
import com.project.app.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpService otpService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(String email, String password,String name) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // In production, hash the password
        user.setName(name);
        user = userRepository.save(user);


        String otp = otpService.generateOtp(email);
        emailService.sendOtpEmail(email, otp);

        return user ;
    }

    public boolean verifyEmail(String email, String otp) {
        if (otpService.validateOtp(email, otp)) {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            user.setVerified(true);
            userRepository.save(user);
            otpService.markOtpAsUsed(email);
            return true;
        }
        return false;
    }

    public void resendOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.isVerified()) {
            throw new RuntimeException("Email already verified");
        }

        String otp = otpService.generateOtp(email);
        emailService.sendOtpEmail(email, otp);
    }
}
