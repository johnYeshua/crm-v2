package com.snva.crmproject.service;
import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.snva.crmproject.entity.userDetails.User;

public interface AuthenticationService extends UserDetailsService {

	User createUser(User user);

	User updatePassword(User user);

	User updateUser(User user);

	User getUserDetailsbyUserName(String username);

	User getUserDetailsbyUserId(long userId);

	List<User> getAllUsers();

	User suspendUser(User user);

}
