package com.project.auth_service.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class GoogleTokenValidator {

    // @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId = "916755134531-fvnijil1m46cfuu84fgfm9uionutvr66.apps.googleusercontent.com";

   


    public GoogleIdToken.Payload validateToken(String idToken) throws Exception {
        // Use GsonFactory instead of JacksonFactory
        System.out.println("hello in validate");
        JsonFactory jsonFactory = GsonFactory.getDefaultInstance();

        System.out.println("going to google verifier");

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                jsonFactory
        ).setAudience(Collections.singletonList(googleClientId)).build();

        System.out.println("going to verify(idToken) ");

        GoogleIdToken googleIdToken = verifier.verify(idToken);
        System.out.println("google id token is " + googleIdToken);
        if (googleIdToken != null) {
            System.out.println("payload is "+googleIdToken.getPayload());
            return googleIdToken.getPayload();
        } else {
            throw new RuntimeException("Invalid ID token");
        }
    }
}