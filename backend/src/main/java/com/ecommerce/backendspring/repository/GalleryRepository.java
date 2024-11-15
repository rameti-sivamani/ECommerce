package com.ecommerce.backendspring.repository;

import com.ecommerce.backendspring.model.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryRepository extends JpaRepository<Gallery, Long> {
}
