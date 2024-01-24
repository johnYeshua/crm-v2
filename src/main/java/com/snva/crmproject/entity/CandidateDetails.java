package com.snva.crmproject.entity;


import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "CandidateDetails")


public class CandidateDetails {
	@Id
	private String candidateId;
	private String skillSet;
	private int communicationSkill;
	private String addressLine1;
	private String addressLine2;
	private String addressCity;
	private String addressState;
	private String addressCounty;
	private String addressZipCode;
	private String source;
	private String remarks;
	private String interviewDate;
	private String interviewer;
	private String interviewerFeedback;
	private String candidateInterviewStatus;
	private boolean lOISent;
	private boolean lOIAccepted;
	private boolean joinedBatch;
	private String startDate;
	
	
	public CandidateDetails(String candidateId, String skillSet, int communicationSkill, String addressLine1,
			String addressLine2, String addressCity, String addressState, String addressCounty, String addressZipCode,
			String source, String remarks, String interviewDate, String interviewer, String interviewerFeedback,
			String candidateInterviewStatus, boolean lOISent, boolean lOIAccepted, boolean joinedBatch,
							String startDate) {
		super();
		this.candidateId = candidateId;
		this.skillSet = skillSet;
		this.communicationSkill = communicationSkill;
		this.addressLine1 = addressLine1;
		this.addressLine2 = addressLine2;
		this.addressCity = addressCity;
		this.addressState = addressState;
		this.addressCounty = addressCounty;
		this.addressZipCode = addressZipCode;
		this.source = source;
		this.remarks = remarks;
		this.interviewDate = interviewDate;
		this.interviewer = interviewer;
		this.interviewerFeedback = interviewerFeedback;
		this.candidateInterviewStatus = candidateInterviewStatus;
		this.lOISent = lOISent;
		this.lOIAccepted= lOIAccepted;
		this.joinedBatch = joinedBatch;
		this.startDate = startDate;
	}
	public CandidateDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getCandidateId() {
		return candidateId;
	}
	public void setCandidateId(String candidateId) {
		this.candidateId = candidateId;
	}
	public String getSkillSet() {
		return skillSet;
	}
	public void setSkillSet(String skillSet) {
		this.skillSet = skillSet;
	}
	public int getCommunicationSkill() {
		return communicationSkill;
	}
	public void setCommunicationSkill(int communicationSkill) {
		this.communicationSkill = communicationSkill;
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
	public String getAddressCounty() {
		return addressCounty;
	}
	public void setAddressCounty(String addressCounty) {
		this.addressCounty = addressCounty;
	}
	public String getAddressZipCode() {
		return addressZipCode;
	}
	public void setAddressZipCode(String addressZipCode) {
		this.addressZipCode = addressZipCode;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getInterviewDate() {
		return interviewDate;
	}
	public String getInterviewer() {
		return interviewer;
	}
	public void setInterviewer(String interviewer) {
		this.interviewer = interviewer;
	}
	public void setInterviewDate(String interviewDate) {
		this.interviewDate = interviewDate;
	}
	public String getInterviewerFeedback() {
		return interviewerFeedback;
	}
	public void setInterviewerFeedback(String interviewerFeedback) {
		this.interviewerFeedback = interviewerFeedback;
	}
	public String getCandidateInterviewStatus() {
		return candidateInterviewStatus;
	}
	public void setCandidateInterviewStatus(String candidateInterviewStatus) {
		this.candidateInterviewStatus = candidateInterviewStatus;
	}
	
	public boolean getLOISent() {
		return lOISent;
	}
	public void setLOISent(boolean lOISent) {
		this.lOISent = lOISent;
	}
	public boolean getLOIAccepted() {
		return lOIAccepted;
	}
	public void setLOIAccepted(boolean lOIAccepted) {
		this.lOIAccepted = lOIAccepted;
	}
	public boolean isJoinedBatch() {
		return joinedBatch;
	}
	public void setJoinedBatch(boolean joinedBatch) {
		this.joinedBatch = joinedBatch;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "candidateId")
	@JsonBackReference
	private CandidateBasicDetails candidateBasicDetails;

	
	public CandidateBasicDetails getCandidateBasicDetails() {
        return candidateBasicDetails;
    }

	public void setCandidateBasicDetails(CandidateBasicDetails candidateBasicDetails) {
        this.candidateBasicDetails = candidateBasicDetails;
        if (candidateBasicDetails != null) {
            candidateBasicDetails.setDetails(this);
        }
    }
	
	
}
