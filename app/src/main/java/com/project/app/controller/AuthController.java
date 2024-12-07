package com.project.app.controller;


import com.project.app.dto.*;
import com.project.app.model.User;
import com.project.app.service.AuthService;
import com.project.app.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins ="http://localhost:3000")
public class AuthController {
    @Autowired
    private UserService userService;

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        User user = userService.registerUser(request.getEmail(), request.getPassword(),request.getName(),request.getRoles(),request.getClub());

        if(user != null)
        return ResponseEntity.ok("Please check your email for OTP.");


        return ResponseEntity.ofNullable("error pls check your email and password credentials");
    }

//    @PostMapping("/verify")
//    public ResponseEntity<?> verifyEmail(@Valid @RequestBody VerificationRequest request) {
//        boolean verified = userService.verifyEmail(request.getEmail(), request.getOtp());
//        if (verified) {
//            return ResponseEntity.ok("Email verified successfully");
//        }
//        return ResponseEntity.badRequest().body("Invalid OTP");
//    }
@PostMapping("/verify")
public ResponseEntity<?> verifyEmail(@Valid @RequestBody VerificationRequest request) {
    boolean verified = userService.verifyEmail(request.getEmail(), request.getOtp());

    if (verified) {

        AuthResponse authResponse = authService.registerVerified(request);


        return ResponseEntity.ok(authResponse);
    }

    return ResponseEntity.badRequest().body("Invalid OTP");
}


    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestParam String email) {
        userService.resendOtp(email);
        return ResponseEntity.ok("OTP resent successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        System.out.println("logging in");
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody String refreshToken) {
        return ResponseEntity.ok(authService.refreshToken(refreshToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        authService.logout();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody EmailReq emailReq){
            userService.sendForgotPasswordOtp(emailReq.getEmail());
            return ResponseEntity.ok("sent forgot password otp to email");
    }

    @PostMapping("/forgotPassword/verify")
    public ResponseEntity<?> verifyFpOtp(@Valid @RequestBody VerificationRequest request) {
        boolean verified = userService.verifyFpOtp(request.getEmail(), request.getOtp());

        if (verified) {

            return ResponseEntity.ok("redirecting to change password");
        }

        return ResponseEntity.badRequest().body("Invalid OTP");
    }

    @PostMapping("/forgotPassword/changePassword")
    public ResponseEntity<?> verifyChangePassword(@RequestParam String email,@RequestParam String newP, @RequestParam String confirmP){
            boolean updated = userService.updatePassword(email,newP,confirmP);

            if(updated){
                return ResponseEntity.ok("updated password pls login again");
            }

        return ResponseEntity.ok("new Password and confirm password doesn't match");


    }

}