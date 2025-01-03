package com.project.notification_service.service;

import com.project.notification_service.dto.EventMessage;
import com.project.notification_service.dto.User;
import com.project.notification_service.feign.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventNotificationListener {

    @Autowired
    private  EmailService emailService;

    @Autowired
    private UserService userService;



    @KafkaListener(topics = "new-events", groupId = "${spring.kafka.consumer.group-id}")
    public void handleNewEvent(EventMessage eventMessage) {

        List<User> users = userService.getAllUsers();

        String subject = "New Event: " + eventMessage.getTitle();
        String emailText = String.format("""
            A new event has been added!
            
            Event: %s
            Description: %s
            Date : %s
            Time : %s
            Venue: %s
            """,
                eventMessage.getTitle(),
                eventMessage.getDescription(),
                eventMessage.getDate(),
                eventMessage.getTime(),
                eventMessage.getVenue()
        );

        // Send email to each user
        users.forEach(user -> {
            emailService.sendEmail(user.getEmail(), subject, emailText);
        });

        System.out.println("finished sending messages to emails");

    }
}
