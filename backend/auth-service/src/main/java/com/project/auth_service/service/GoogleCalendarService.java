package com.project.auth_service.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
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
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        Map<String, Object> event = new HashMap<>();
        event.put("summary", eventDTO.getSummary());
        event.put("description", eventDTO.getDescription());
        
        Map<String, String> start = new HashMap<>();
        start.put("dateTime", eventDTO.getStartDateTime());
        event.put("start", start);
        
        Map<String, String> end = new HashMap<>();
        end.put("dateTime", eventDTO.getEndDateTime());
        event.put("end", end);
        
        if (eventDTO.getLocation() != null) {
            event.put("location", eventDTO.getLocation());
        }
        
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(event, headers);
        
        try {
            restTemplate.exchange(
                CALENDAR_API_URL,
                HttpMethod.POST,
                requestEntity,
                String.class
            );
        } catch (Exception e) {
            System.out.println("Error creating calendar event "+ e);
            throw new RuntimeException("Failed to create calendar event");
        }
    }
}

