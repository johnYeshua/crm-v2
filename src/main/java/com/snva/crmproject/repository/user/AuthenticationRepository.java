package com.snva.crmproject.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.snva.crmproject.entity.userDetails.User;

@Repository
public interface AuthenticationRepository extends JpaRepository<User, Long> {
	Optional<User> findUserByUsername(String username); 
	 Optional<User> findUserByUserId(long userId); 
}
