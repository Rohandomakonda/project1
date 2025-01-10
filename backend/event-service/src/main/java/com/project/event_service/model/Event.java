package com.project.event_service.model;
import jakarta.persistence.*;
import lombok.Data;



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
    private Long likes=0l;
    private Long saves=0l;


    @Lob
    private byte[] image;


     public Long getId() {
         return id;
     }

     public void setId(Long id) {
         this.id = id;
     }

     public String getTitle() {
         return title;
     }

     public void setTitle(String title) {
         this.title = title;
     }

     public String getDescription() {
         return description;
     }

     public void setDescription(String description) {
         this.description = description;
     }

     public String getDate() {
         return date;
     }

     public void setDate(String date) {
         this.date = date;
     }

     public String getTime() {
         return time;
     }

     public void setTime(String time) {
         this.time = time;
     }

     public String getVenue() {
         return venue;
     }

     public void setVenue(String venue) {
         this.venue = venue;
     }

     public String getClub() {
         return club;
     }

     public void setClub(String club) {
         this.club = club;
     }

     public String getVenueDescription() {
         return venueDescription;
     }

     public void setVenueDescription(String venueDescription) {
         this.venueDescription = venueDescription;
     }

     public boolean isPublic() {
         return isPublic;
     }

     public void setPublic(boolean aPublic) {
         isPublic = aPublic;
     }

     public byte[] getImage() {
         return image;
     }

     public void setImage(byte[] image) {
         this.image = image;
     }

    public Long getLikes() {
         return likes;
    }
    public void setLikes(Long l) {
         this.likes=l;
    }
    public Long getSaves() {
         return saves;
    }
    public void setSaves(Long s) {
         this.saves=s;
    }
}


