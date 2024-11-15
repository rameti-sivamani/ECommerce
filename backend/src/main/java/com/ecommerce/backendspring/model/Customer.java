package com.ecommerce.backendspring.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "customers")
public class Customer{
    @Id
    private String id;
    private String first_name;
    private String last_name;
    private String email;
    private String phone_number;
    private String date_of_birth;
    private String gender;
    private String password;
    private LocalDateTime registered_at;
    private boolean active;
    public Customer() {
        this.id = UUID.randomUUID().toString();  // Generate UUID when user is created
        this.registered_at = LocalDateTime.now();
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

    public String getDate_of_birth() {
        return date_of_birth;
    }

    public String getGender() {
        return gender;
    }

    public String getPassword() {
        return password;
    }

    public LocalDateTime getRegistered_at() {
        return registered_at;
    }

    public boolean isActive() {
        return active;
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

    public void setDate_of_birth(String date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRegistered_at(LocalDateTime registered_at) {
        this.registered_at = registered_at;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", email='" + email + '\'' +
                ", phone_number='" + phone_number + '\'' +
                ", date_of_birth='" + date_of_birth + '\'' +
                ", gender='" + gender + '\'' +
                ", password='" + password + '\'' +
                ", registered_at='" + registered_at + '\'' +
                ", active=" + active +
                '}';
    }
}
