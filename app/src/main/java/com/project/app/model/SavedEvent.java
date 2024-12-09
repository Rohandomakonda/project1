package com.project.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SavedEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String date;
    private String venue;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
