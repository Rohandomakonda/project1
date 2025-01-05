package com.project.auth_service.service;


import com.project.auth_service.dto.AuthResponse;
import com.project.auth_service.dto.LoginRequest;
import com.project.auth_service.dto.NotificationRequest;
import com.project.auth_service.dto.VerificationRequest;
import com.project.auth_service.model.Role;
import com.project.auth_service.model.User;
import com.project.auth_service.repo.AuthRepo;
import com.project.auth_service.security.JwtTokenProvider;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.project.auth_service.feign.NotificationClient;


import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class AuthService {


    private  final AuthenticationManager authenticationManager;

    private  final  PasswordEncoder passwordEncoder;

    private  final  JwtTokenProvider tokenProvider;

    private final  AuthRepo repo;

    private final OtpService otpservice;

    @Autowired
    private GoogleTokenValidator googleTokenValidator;


    public AuthService(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider, AuthRepo repo,OtpService otpservice) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.repo = repo;
        this.otpservice = otpservice;
    }


    public AuthResponse registerVerified(VerificationRequest request) {

        // Step 2: Fetch the user by email
        Optional<User> userOpt = repo.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }

        User user = userOpt.get();

        // Step 3: Create a custom Authentication object
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.name())).collect(Collectors.toList())
        );

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities()
        );

        // Step 4: Generate access and refresh tokens using JwtTokenProvider
        String accessToken = tokenProvider.generateAccessToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(user.getEmail());

        // Step 5: Return the AuthResponse
        return new AuthResponse(accessToken, refreshToken, user.getId(), user.getEmail(),user.getName(),user.getRoles(),user.getClub());
    }




    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = repo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("creating auth response object");

        return createAuthResponse(authentication, user);

    }

    public AuthResponse refreshToken(String refreshToken) {
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        String email = tokenProvider.getEmailFromToken(refreshToken);
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                email, null, Collections.emptyList()
        );

        AuthResponse authResponse =  createAuthResponse(authentication, user);
        return authResponse;
    }

    public void logout() {
        SecurityContextHolder.clearContext();
    }

    private AuthResponse createAuthResponse(Authentication authentication, User user) {
        String accessToken = tokenProvider.generateAccessToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(user.getEmail());

        return new AuthResponse(
                accessToken,
                refreshToken,
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRoles(),
                user.getClub()
        );
    }

    public User registerUser(String email, String password, String name, Set<Role> roles,String club) {
        Optional<User> userOptional = repo.findByEmail(email);
        if (userOptional.isPresent() && userOptional.get().isVerified()) {
            throw new RuntimeException("Email already registered pls login");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setName(name);
        user.setRoles(roles);
        user.setClub(club);
        user.setVerified(false);
        repo.save(user);

        String otp = otpservice.generateAndStoreOtp(email);
        NotificationRequest req = new NotificationRequest(email,otp);

       // notificationclient.sendEmail(req);


        return user ;
    }

    public AuthResponse authenticateWithGoogle(String token) {
        try {
            // Validate the Google ID token
            System.out.println("received token is "+token);
            System.out.println("hello ");
            System.out.println("validate is "+googleTokenValidator.validateToken(token));
            var payload = googleTokenValidator.validateToken(token);
            System.out.println("payload is "+payload);

            String email = payload.getEmail();
            String name = (String) payload.get("name");

            System.out.println(email + " email to name " + name);

            // Check if user exists or create a new one
            Optional<User> user = repo.findByEmail(email);

            System.out.println("is user present?? "+user.isPresent());

            //if user is not present then create a new one
            Set<Role> roles = new HashSet<>();
        roles.add(Role.USER);
            User user2;
            if(!user.isPresent()){
               
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setName(name);
                newUser.setRoles(roles); 
                newUser.setVerified(true);
                repo.save(newUser);
                user2=newUser;
            }
            else{
                user2=user.get();
            }

            System.out.println("user2 is "+user2.getEmail());
            
            UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user2.getEmail(),
                user2.getPassword() != null ? user2.getPassword() : "",
                user2.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.name())).collect(Collectors.toList())
                );
                System.out.println("userDetails is done ");
                
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
                    );
                    
                    System.out.println("authentication is set ");
        // Step 4: Generate access and refresh tokens using JwtTokenProvider
        String accessToken = tokenProvider.generateAccessToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(user2.getEmail());

        // Step 5: Return the AuthResponse
        return new AuthResponse(accessToken, refreshToken, user2.getId(), user2.getEmail(),user2.getName(),user2.getRoles(),user2.getClub());
  
        } catch (Exception e) {
           System.out.println("Invalid Google token");
        }
        
        return null;
    }

    


    public boolean verifyEmail(String email, String otp) {

        if (otpservice.validateOtp(email, otp)) {
            User user = repo.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            user.setVerified(true);
            repo.save(user);
            

            return true;
        }
        return false;
    }

    public List<User> getAllUsers() {
        List<User> allusers = repo.findAll();
        return allusers;
    }

    public Long getUserByEmail(String email) {
        System.out.println("email is is "+email);
        Optional<User> user = repo.findByEmail(email);
        if(user.isPresent()){
            User user1 = user.get();
            return user1.getId();
        }
        else{
            throw new UsernameNotFoundException("USER NOT FOUND");
        }
    }

    public void resendOtp(String email) {
        otpservice.generateAndStoreOtp(email);
    }


    public void sendForgotPasswordOtp(String email) {
        otpservice.generateAndStoreOtp(email);
    }


    public boolean verifyFpOtp(String email, String otp) {
        return otpservice.validateOtp(email,otp);
    }
    
    
    public boolean updatePassword(String email, String newP, String confirmP) {
        if(newP.equals(confirmP)){
            User user = repo.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            user.setPassword(passwordEncoder.encode(newP));
            repo.save(user);
           // notificationclient.sendPasswordChangeEmail(user.getEmail(),"Password has been changed");
            return true;
        }

        return false;
       
    }


}