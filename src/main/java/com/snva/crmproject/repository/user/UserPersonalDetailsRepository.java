package com.snva.crmproject.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.snva.crmproject.entity.userDetails.UserPersonalDetails;

public interface UserPersonalDetailsRepository extends JpaRepository<UserPersonalDetails, Long> {
	Optional<UserPersonalDetails> findUserByUserId(long userId); 
}
