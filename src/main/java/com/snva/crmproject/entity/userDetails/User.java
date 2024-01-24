package com.snva.crmproject.entity.userDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
public class User implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long userId;
	private String username; 
	private String password; 
	private String role;
	
	@Column(name = "account_non_locked")
	private boolean accountNonLocked;
	@Transient
	private String firstName;
	@Transient
	private String lastName;
	@Transient
	private String phone;
	@Transient
	private String addressLine1; 
	@Transient
	private String addressLine2; 
	@Transient
	private String addressCity; 
	@Transient
	private String addressState; 
	@Transient
	private String addressCountry;  
	@Transient
	private String addressZipCode; 
	
	
	
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(long userId, String username, String role, boolean accountNonLocked, String firstName, String lastName, String phone,
			String addressLine1, String addressLine2, String addressCity, String addressState, String addressCountry,
			String addressZipCode) {
		super();
		this.userId = userId;
		this.username = username;
		this.role = role;
		this.accountNonLocked = accountNonLocked;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phone;
		this.addressLine1 = addressLine1;
		this.addressLine2 = addressLine2;
		this.addressCity = addressCity;
		this.addressState = addressState;
		this.addressCountry = addressCountry;
		this.addressZipCode = addressZipCode;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}
	
	public String getRole() {
		return role;
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return accountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

	public void setPassword(String password) {
		this.password=password;		
	}
	
	public void setRole(String role) {
		this.role=role;		
	}
	
	@Override
   public Collection<? extends GrantedAuthority> getAuthorities() {
       List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();

       list.add(new SimpleGrantedAuthority(role));

       return list;
   }


	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setAccountNonLocked(boolean accountNonLocked) {
		this.accountNonLocked = accountNonLocked;
	}
	
	public UserPersonalDetails toUserPersonalDetails(){
		return new UserPersonalDetails(firstName,lastName,phone,addressLine1,addressLine2,addressCity,addressState,addressCountry,addressZipCode,this);
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddressLine1() {
		return addressLine1;
	}

	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	public String getAddressLine2() {
		return addressLine2;
	}

	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	public String getAddressCity() {
		return addressCity;
	}

	public void setAddressCity(String addressCity) {
		this.addressCity = addressCity;
	}

	public String getAddressState() {
		return addressState;
	}

	public void setAddressState(String addressState) {
		this.addressState = addressState;
	}

	public String getAddressCountry() {
		return addressCountry;
	}

	public void setAddressCountry(String addressCountry) {
		this.addressCountry = addressCountry;
	}

	public String getAddressZipCode() {
		return addressZipCode;
	}

	public void setAddressZipCode(String addressZipCode) {
		this.addressZipCode = addressZipCode;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", username=" + username + ", password=" + password + ", role=" + role
				+ ", accountNonLocked=" + accountNonLocked + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", phone=" + phone + ", address_Line1=" + addressLine1 + ", address_Line2=" + addressLine2
				+ ", address_City=" + addressCity + ", address_State=" + addressState + ", address_Country="
				+ addressCountry + ", address_ZipCode=" + addressZipCode + "]";
	}
	
	
}
