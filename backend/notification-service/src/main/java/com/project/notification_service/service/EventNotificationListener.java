// package com.project.notification_service.service;

// import com.project.notification_service.dto.EventMessage;
// import com.project.notification_service.dto.EventNotificationDTO;
// import com.project.notification_service.dto.NotificationMessage;
// import com.project.notification_service.dto.User;
// import com.project.notification_service.feign.UserService;
// import com.project.notification_service.model.EventNotification;
// import com.project.notification_service.repo.NotificationRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.kafka.annotation.KafkaListener;
// import org.springframework.messaging.simp.SimpMessagingTemplate;
// import org.springframework.stereotype.Service;
// import java.util.List;

// @Service
// public class EventNotificationListener {

//     @Autowired
//     private  EmailService emailService;

//     @Autowired
//     private UserService userService;

//     @Autowired
//     private SimpMessagingTemplate messagingTemplate;

//     @Autowired
//     private NotificationRepository notificationRepository;

//     @KafkaListener(topics = "new-events", groupId = "${spring.kafka.consumer.group-id}")
//     public void handleNewEvent(EventMessage eventMessage) {

//         List<User> users = userService.getAllUsers();

//         String subject = "New Event: " + eventMessage.getTitle();
//         String emailText = String.format("""
//             A new event has been added!
            
//             Event: %s
//             Description: %s
//             Date : %s
//             Time : %s
//             Venue: %s
//             """,
//                 eventMessage.getTitle(),
//                 eventMessage.getDescription(),
//                 eventMessage.getDate(),
//                 eventMessage.getTime(),
//                 eventMessage.getVenue()
//         );

//         // Send email to each user
//         users.forEach(user -> {
//             emailService.sendEmail(user.getEmail(), subject, emailText);
//         });

//         System.out.println("finished sending messages to emails");

//     }


    
//     // public EventNotification createNotification(EventNotificationDTO dto) {
//     //     EventNotification notification = new EventNotification();
//     //     notification.setEventId(dto.getEventId());
//     //     notification.setUserId(dto.getUserId());
//     //     notification.setRead(false);
        
//     //     notification = notificationRepository.save(notification);
        
//     //     // Send real-time notification
//     //     NotificationMessage message = new NotificationMessage(
//     //         notification.getId(),
//     //         notification.getEventId(),
//     //         notification.getUserId(),
//     //         "New event has been added"
//     //     );
        
//     //    // sendNotificationToUser(dto.getUserId(), message);
        
//     //     return notification;
//     // }
    
//     public List<EventNotification> getUnreadNotifications(Long userId) {
//         return notificationRepository.findByUserIdAndIsReadFalse(userId);
//     }
    
//     public void markAsRead(Long notificationId) {
//         notificationRepository.findById(notificationId)
//             .ifPresent(notification -> {
//                 notification.setRead(true);
//                 notificationRepository.save(notification);
//             });
//     }
    
//     public void markEventAsRead(Long eventId, Long userId) {
//         notificationRepository.findByEventIdAndUserId(eventId, userId)
//             .ifPresent(notification -> {
//                 notification.setRead(true);
//                 notificationRepository.save(notification);
//             });
//     }
    
//     private void sendNotificationToUser(Long userId, NotificationMessage message) {
//         try {
//             messagingTemplate.convertAndSendToUser(
//                 userId.toString(),
//                 "/queue/notifications",
//                 message
//             );
//             System.out.println("Notification sent to user: "+ userId);
//         } catch (Exception e) {
//             System.out.println("error sending event to user "+ e);
//         }
//     }
// }
