package com.project.auth_service.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import com.project.auth_service.dto.CalendarEventDto;

import java.util.HashMap;
import java.util.Map;


@Service
public class GoogleCalendarService {
    private static final String CALENDAR_API_URL = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
    
    private final RestTemplate restTemplate;
    
    public GoogleCalendarService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public void createEvent(CalendarEventDto eventDTO, String accessToken) {
        System.out.println("hello1: Entered createEvent method");

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken.trim()); // Trim to remove accidental whitespace
        headers.setContentType(MediaType.APPLICATION_JSON);
        System.out.println("hello2: Headers set with Bearer token and Content-Type");

        Map<String, Object> event = new HashMap<>();
        event.put("summary", eventDTO.getTitle());
        event.put("description", eventDTO.getDescription());
        System.out.println("hello3: Event summary and description set");

        Map<String, String> start = new HashMap<>();
        start.put("dateTime", eventDTO.getStartDateTime());
        event.put("start", start);
        System.out.println("hello4: Event start date and time set");

        Map<String, String> end = new HashMap<>();
        end.put("dateTime", eventDTO.getEndDateTime());
        event.put("end", end);
        System.out.println("hello5: Event end date and time set");

        if (eventDTO.getLocation() != null) {
            event.put("location", eventDTO.getLocation());
            System.out.println("hello6: Event location set");
        }

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(event, headers);
        System.out.println("hello7: Request entity created");

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    CALENDAR_API_URL,
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );
            System.out.println("hello8: Event created successfully: " + response.getBody());
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.out.println("Error creating calendar event (API error): " + e.getResponseBodyAsString());
            System.out.println("HTTP Status Code: " + e.getStatusCode());
            System.out.println("Error Response Headers: " + e.getResponseHeaders());
            throw new RuntimeException("Failed to create calendar event: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Error creating calendar event (unexpected): " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to create calendar event");
        }
    }


}

