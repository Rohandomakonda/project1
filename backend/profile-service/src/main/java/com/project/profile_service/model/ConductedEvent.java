package com.project.profile_service.model;

import lombok.*;
import jakarta.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
public class ConductedEvent {
    //title,category,likes,clubname
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String category;
    private Long likes;
    private String clubname;

    public long getLikes() {
        return likes;
    }
}
