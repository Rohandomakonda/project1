package com.project.app.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Event {
    @Id
    private int id;
    private String description;
    private String date;
    private String time;
    private String venue;
}
