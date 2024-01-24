package com.snva.crmproject.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.snva.crmproject.entity.userDetails.User;


public interface AccountRepository extends JpaRepository<User, Long> {
    
	

    static Optional<User> findByUsername(String username) {
		// TODO Auto-generated method stub
		return null;
		
	}
}