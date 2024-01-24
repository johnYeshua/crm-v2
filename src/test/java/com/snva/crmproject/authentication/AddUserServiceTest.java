package com.snva.crmproject.authentication;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.snva.crmproject.entity.userDetails.User;
import com.snva.crmproject.entity.userDetails.UserPersonalDetails;
import com.snva.crmproject.repository.user.AuthenticationRepository;
import com.snva.crmproject.repository.user.UserPersonalDetailsRepository;
import com.snva.crmproject.service.AuthenticationService;
import com.snva.crmproject.service.AuthenticationServiceImpl;

@ExtendWith(MockitoExtension.class)
public class AddUserServiceTest {
	static User userTestBefore;
	static User userTestAfter;
	static Optional<User>  userOptional;
	static Optional<UserPersonalDetails>  userPersonalDetailsOptional;
	static UserPersonalDetails userPersonalDetailsTest;
	
	@InjectMocks
	private AuthenticationServiceImpl authenticationService;
	
	@Mock
	private AuthenticationRepository authenticationRepository;
	
	@Mock
	UserPersonalDetailsRepository userPersonalDetailsRepository;
	
	@BeforeAll
	public static void setUpVars () {

		userTestBefore = new User(0,"username","Role",true,"FirstName","LastName","1234567890","AddL1","AddrL2","AddrCity","AddrState","AddresCountry","AddZip");
		userTestAfter = new User(100,"username","Role",true,"FirstName","LastName","1234567890","AddL1","AddrL2","AddrCity","AddrState","AddresCountry","AddZip");

		userTestAfter.setAccountNonLocked(true);
		userOptional= Optional.of(userTestAfter);
		userPersonalDetailsTest = new UserPersonalDetails("FirstName","LastName","1234567890","AddL1","AddrL2","AddrCity","AddrState","AddresCountry","AddZip",userTestBefore);
		userPersonalDetailsOptional = Optional.of(userPersonalDetailsTest);
		
	}
	@Test
	public void createUserTest() {
		Mockito.lenient().when(authenticationRepository.save(userTestBefore)).thenReturn(userTestAfter);
		User user = authenticationService.createUser(userTestBefore);
		assertEquals(user.isAccountNonLocked(), true);
		assertNotEquals(user.getUserId(), 0);
	}
	@Test
	public void getUserbyUserNameTest() {
		Mockito.lenient().when(authenticationRepository.findUserByUsername("username")).thenReturn(userOptional);
		Mockito.lenient().when(userPersonalDetailsRepository.findUserByUserId(100)).thenReturn(userPersonalDetailsOptional);
		User user = authenticationService.getUserDetailsbyUserName("username");
		assertEquals(user.getUsername(),"username");
		assertNotEquals(user.getUserId(),100);
	}
}



