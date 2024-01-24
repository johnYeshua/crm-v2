package com.snva.crmproject.entity;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import com.snva.crmproject.entity.userDetails.User;
import com.snva.crmproject.entity.userDetails.UserPersonalDetails;

public class SecurityEntityTest {
	
		static User userTest;
		static UserPersonalDetails userPersonalDetailsTest;
		
		@BeforeAll
		
		public static void setUpVars () {
			/*
			 * String firstName, String lastName, String phone, String address_Line1,
				String address_Line2, String address_City, String address_State, String address_Country,
				String address_ZipCode,User user
			 */
			userTest = new User(100,"username","Role",true,"FirstName","LastName","1234567890","AddL1","AddrL2","AddrCity","AddrState","AddresCountry","AddZip");
			userPersonalDetailsTest = new UserPersonalDetails("FirstName","LastName","1234567890","AddL1","AddrL2","AddrCity","AddrState","AddresCountry","AddZip",userTest);
		}
		
		@Test
		public void toUserPersonalDetailsTest() {
			UserPersonalDetails userP = userTest.toUserPersonalDetails();
			assertThat(userP).usingRecursiveComparison().isEqualTo(userPersonalDetailsTest);	
		}
		
		@Test
		public void toUserTest() {
			User user = userPersonalDetailsTest.toUser();
			assertThat(user).usingRecursiveComparison().isEqualTo(userTest);	
		}
	

}
