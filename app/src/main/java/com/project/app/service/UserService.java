package com.project.app.service;


import com.project.app.model.Role;
import com.project.app.model.User;
import com.project.app.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    public User registerUser(String email, String password, String name, Set<Role> roles) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent() && userOptional.get().isVerified()) {
            throw new RuntimeException("Email already registered pls login");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setName(name);
        user.setRoles(roles);
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

    public boolean verifyFpOtp(String email, String otp){
        if (!otpService.validateOtp(email, otp)) {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            user.setVerified(false);
            return false;
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setVerified(true);
        otpService.markOtpAsUsed(email);

        return true;
    }




    public void sendForgotPasswordOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String otp = otpService.generateOtp(email);
        emailService.sendForgotOtp(email, otp);
    }

    public boolean updatePassword(String email, String newP, String confirmP) {

        if(newP.equals(confirmP)){
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            user.setPassword(passwordEncoder.encode(newP));
            userRepository.save(user);
            emailService.sendPasswordChangeEmail(user.getEmail(),"Password has been changed");
            return true;
        }

        return false;

    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
