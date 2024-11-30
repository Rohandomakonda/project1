package com.project.app.service;

import com.project.app.dto.AuthResponse;
import com.project.app.dto.LoginRequest;
import com.project.app.dto.RegisterRequest;
import com.project.app.dto.VerificationRequest;
import com.project.app.model.Role;
import com.project.app.model.User;
import com.project.app.repo.UserRepository;
import com.project.app.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

//    public AuthResponse register(VerificationRequest request) {
//
//
//        User user = new User();
//        user.setName(request.getName());
//        user.setEmail(request.getEmail());
//        user.setPassword(passwordEncoder.encode(request.getPassword()));
//        user.setRoles(Collections.singleton(Role.USER));
//
//        userRepository.save(user);
//
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
//        );
//
//        return createAuthResponse(authentication, user);
//    }


  //      public AuthResponse registerVerified(VerificationRequest request) {


//        User user = new User();
//        user.setName(request.getName());
//        user.setEmail(request.getEmail());
//        user.setPassword(passwordEncoder.encode(request.getPassword()));
//        user.setRoles(Collections.singleton(Role.USER));
//
//        userRepository.save(user);

//
//
//
//                // Step 2: Fetch the user by email
//                Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
//                if (userOpt.isEmpty()) {
//                    throw new UsernameNotFoundException("User not found");
//                }
//
//                User user = userOpt.get();
//
//                // Step 3: Generate JWT tokens for the verified user
//                String accessToken = tokenProvider.generateAccessToken(user);
//                String refreshToken = tokenProvider.generateRefreshToken(user);
//
//                // Step 4: Return the AuthResponse
//                return new AuthResponse(accessToken, refreshToken, user.getId(), user.getEmail(),user.getName(),user.getRoles());
//
//
//
//
//        }

    public AuthResponse registerVerified(VerificationRequest request) {



        // Step 2: Fetch the user by email
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
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
        return new AuthResponse(accessToken, refreshToken, user.getId(), user.getEmail(),user.getName(),user.getRoles());
    }




    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return createAuthResponse(authentication, user);
    }

    public AuthResponse refreshToken(String refreshToken) {
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        String email = tokenProvider.getEmailFromToken(refreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                email, null, Collections.emptyList()
        );

        return createAuthResponse(authentication, user);
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
                user.getRoles()
        );
    }
}