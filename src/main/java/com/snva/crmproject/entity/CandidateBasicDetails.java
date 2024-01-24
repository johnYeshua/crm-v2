package com.snva.crmproject.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name ="CandidateBasicDetails")
public class CandidateBasicDetails {
	@Id
	private String candidateId;
	private String firstName;
	private String middleName;
	private String lastName;
	private String recruiterName;
	private String email;
	private String phoneNumber;
	private String workExperience;
	private String visaStatus;
	private String ssn;
	private String school;
	private String degree;

	public CandidateBasicDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CandidateBasicDetails(String candidateId, String firstName, String middleName, String lastName,
			String recruiterName, String email, String phoneNumber, String workExperience, String visaStatus,
			String ssn, String school, String degree) {
		super();
		this.candidateId = candidateId;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.recruiterName = recruiterName;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.workExperience = workExperience;
		this.visaStatus = visaStatus;
		this.ssn = ssn;
		this.school = school;
		this.degree = degree;
	}
	public String getCandidateId() {
		return candidateId;
	}
	public void setCandidateId(String candidateId) {
		this.candidateId = candidateId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getRecruiterName() {
		return recruiterName;
	}
	public void setRecruiterName(String recruiterName) {
		this.recruiterName = recruiterName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getWorkExperience() {
		return workExperience;
	}
	public void setWorkExperience(String workExperience) {
		this.workExperience = workExperience;
	}
	public String getVisaStatus() {
		return visaStatus;
	}
	public void setVisaStatus(String visaStatus) {
		this.visaStatus = visaStatus;
	}
	public String getSsn() {
		return ssn;
	}
	public void setSsn(String ssn) {
		this.ssn = ssn;
	}
	public String getSchool() {
		return school;
	}
	public void setSchool(String school) {
		this.school = school;
	}
	public String getDegree() {
		return degree;
	}
	public void setDegree(String degree) {
		this.degree = degree;
	}

	@OneToOne(mappedBy = "candidateBasicDetails", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    
    private CandidateDetails details;

//	    @OneToMany(mappedBy = "candidateId")
//	    private List<CandidateAttachments> attachments;
	    
	    
	    public CandidateDetails getDetails() {
	        return details;
	    }

	    public void setDetails(CandidateDetails details) {
	        this.details = details;
//	        if (details != null) {
//	            details.setCandidateBasicDetails(this);
//	        }
	    }

//	    public List<CandidateAttachments> getAttachments() {
//	        return attachments;
//	    }
//
//	    public void setAttachments(List<CandidateAttachments> attachments) {
//	        this.attachments = attachments;
//	    }
		@Override
		public String toString() {
			return "CandidateBasicDetails [candidateId=" + candidateId + ", firstName=" + firstName + ", middleName="
					+ middleName + ", lastName=" + lastName + ", recruiterName=" + recruiterName + ", email=" + email
					+ ", phoneNumber=" + phoneNumber + ", workExperience=" + workExperience + ", visaStatus="
					+ visaStatus + ", ssn=" + ssn + ", details=" + details + ", attachments=" + "asda" + "]";
		}
	
	
}
