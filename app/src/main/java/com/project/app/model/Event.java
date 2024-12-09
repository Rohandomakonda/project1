package com.project.app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String date;
    private String time;
    private String venue;
    private String club;
    private String venueDescription;
    private boolean isPublic;

    @Lob
    private byte[] image;

    @ManyToMany(mappedBy = "favoriteEvents")
    @JsonIgnoreProperties("favoriteEvents")
    private List<User> favoritedByUsers;

}
