package com.project.profile_service.model;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "favorite_events",
        uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "eventId"}))
public class FavoriteEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long eventId;
}
