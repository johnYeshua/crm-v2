package com.snva.crmproject.authentication;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.snva.crmproject.config.ApplicationConfig;
import com.snva.crmproject.controller.AuthenticationController;
import com.snva.crmproject.entity.userDetails.User;
import com.snva.crmproject.entity.userDetails.UserPersonalDetails;
import com.snva.crmproject.service.AuthenticationService;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
//@WebMvcTest(AuthenticationController.class)
@AutoConfigureMockMvc(addFilters = true)
@Import(ApplicationConfig.class)
public class AuthenticationControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private AuthenticationService authService;
	
	static User userTest;
	static UserPersonalDetails userPersonalDetailsTest;
//	public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

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
//	 @WithMockUser(value = "SU14",roles={"ADMIN"})
//	@WithAnonymousUser
	@Test
	void unAuthorizedCheck() throws Exception {
		when(authService.createUser(userTest)).thenReturn(userTest);
		 ObjectMapper mapper = new ObjectMapper();
		    mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
		    ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
		    String requestJson=ow.writeValueAsString(userTest );
		    MvcResult result = this.mockMvc.perform(post("/createRec_admin")
				.contentType(MediaType.APPLICATION_JSON)
		        .content(requestJson))
		        .andExpect(status().isUnauthorized())
		        .andReturn();
		    
				
	}

}



