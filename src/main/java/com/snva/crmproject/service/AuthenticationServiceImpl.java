package com.snva.crmproject.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.snva.crmproject.entity.userDetails.User;
import com.snva.crmproject.entity.userDetails.UserPersonalDetails;
import com.snva.crmproject.repository.user.AuthenticationRepository;
import com.snva.crmproject.repository.user.UserPersonalDetailsRepository;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

	@Autowired
	AuthenticationRepository authenticationRepository;
	@Autowired
	UserPersonalDetailsRepository userPersonalDetailsRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = authenticationRepository.findUserByUsername(username) 
		         .orElseThrow(() -> new UsernameNotFoundException("User not present")); 
		System.out.println(user.getRole());
		         return user; 
	}
	
	@Override
	 public User createUser(User user) { 
		 if(authenticationRepository.findUserByUsername(user.getUsername()).isPresent()) {
			 return null;
		 }
		 UserPersonalDetails userPersonalDetails = user.toUserPersonalDetails();
		 System.out.println(userPersonalDetails);
		 System.out.println(user);
		 user.setAccountNonLocked(true);
		 userPersonalDetailsRepository.save(userPersonalDetails);
		   return authenticationRepository.save(user);
	   }
	 
	@Override 
	public User updatePassword(User user) { 
		 User userDb = authenticationRepository.findUserByUsername(user.getUsername()).get();
		 userDb.setPassword(user.getPassword());
		 System.out.println(userDb.toString());
		 System.out.println("Update");
		   return authenticationRepository.save(userDb);
	   }
	@Override 
	public User updateUser(User user) { 
		 long userId = authenticationRepository.findUserByUsername(user.getUsername()).get().getUserId();
		 UserPersonalDetails userPersonalDetails = userPersonalDetailsRepository.findUserByUserId(userId).get();
		 System.out.println(userPersonalDetails.toString());
		 System.out.println("Update User");
		 userPersonalDetails.update(user);
		   return userPersonalDetailsRepository.save(userPersonalDetails).toUser();
	   }
	 
	@Override 
	public User getUserDetailsbyUserName(String username) {
		 User user = authenticationRepository.findUserByUsername(username).get();
		 System.out.println(user.toString());
		 UserPersonalDetails userPersonalDetails = userPersonalDetailsRepository.findUserByUserId(user.getUserId()).get();
		 
		 return userPersonalDetails.toUser();
	 }
	@Override 
	public User getUserDetailsbyUserId(long userId) {
		 UserPersonalDetails userPersonalDetails = userPersonalDetailsRepository.findUserByUserId(userId)
				 					.orElseThrow(() -> new UsernameNotFoundException("User not present")); 
		 
		 return userPersonalDetails.toUser();
	 }

	@Override
	public List<User> getAllUsers() {
		List<User> listOfUsers = new ArrayList<User>();
		for(UserPersonalDetails userDetails: userPersonalDetailsRepository.findAll()) {
			listOfUsers.add(userDetails.toUser());
		}
		return listOfUsers;
	}


	//****************delete******************//
	@Override
	public User suspendUser(User user) {
		User userDb = authenticationRepository.findUserByUsername(user.getUsername()).get();
		userDb.setAccountNonLocked(user.isAccountNonLocked());
		System.out.println("######Suspend User:");
		System.out.println(userDb.toString());
		System.out.println("######");
		return authenticationRepository.save(userDb);
	}


}
