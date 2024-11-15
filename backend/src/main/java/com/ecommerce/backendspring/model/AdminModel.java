package com.ecommerce.backendspring.model;

import jakarta.persistence.*;

import java.util.UUID;
import java.time.LocalDateTime;

@Entity
@Table(name = "admin")
public class AdminModel {
    @Id
    private String id;
    private String first_name;
    private String last_name;
    private String email;
    private String phone_number;
    private String password;
    private String profile_img;
    private LocalDateTime registered_at;
    public String getProfile_image() {
        return profile_img;
    }

    public void setProfile_image(String profile_img) {
        this.profile_img = profile_img;
    }
    public AdminModel() {
        this.id = UUID.randomUUID().toString();
        this.registered_at=LocalDateTime.now();// Generate UUID when user is created
    }

    public String getId() {
        return id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone_number() {
        return phone_number;
    }



    public String getPassword() {
        return password;
    }

    public LocalDateTime getRegistered_at() {
        return registered_at;
    }


    public void setId(String id) {
        this.id = id;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }




    public void setPassword(String password) {
        this.password = password;
    }

    public void setRegistered_at(LocalDateTime registered_at) {
        this.registered_at = registered_at;
    }


    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", email='" + email + '\'' +
                ", phone_number='" + phone_number + '\'' +
                ",profile_img='" + profile_img + '\'' +
                ", password='" + password + '\'' +
                ", registered_at='" + registered_at + '\'' +
                '}';
    }
}
