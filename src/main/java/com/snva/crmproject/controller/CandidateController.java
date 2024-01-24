package com.snva.crmproject.controller;


import java.sql.Date;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.snva.crmproject.entity.CandidateBasicDetails;

import com.snva.crmproject.entity.CandidateDetails;
import com.snva.crmproject.service.CandidateAttachmentsService;
import com.snva.crmproject.service.CandidateBasicDetailsService;
import com.snva.crmproject.service.CandidateDetailsService;

import com.snva.crmproject.service.CandidateService;

@RestController
@CrossOrigin(origins="http://localhost:4200/")
@RequestMapping("/Candidates")


public class CandidateController {

    @Autowired
    private CandidateService candidateService;
    

    private final CandidateDetailsService candidateDetailsService;
    private final CandidateBasicDetailsService candidateBasicDetailsService;
    private final CandidateAttachmentsService candidateAttachmentsService;

    @Autowired
    public CandidateController(CandidateDetailsService candidateDetailsService,
                               CandidateBasicDetailsService candidateBasicDetailsService,
                               CandidateAttachmentsService candidateAttachmentsService) {
        this.candidateDetailsService = candidateDetailsService;
        this.candidateBasicDetailsService = candidateBasicDetailsService;
        this.candidateAttachmentsService = candidateAttachmentsService;
    }

    @PostMapping("/add")
    public CandidateBasicDetails addCandidate(@RequestBody CandidateBasicDetails candidateBasicDetails) {
        System.out.println(candidateBasicDetails.toString());
//        System.out.println(candidateBasicDetails.getAttachments().get(0).toString());
    	return candidateService.addNewCandidate(candidateBasicDetails);
    }

    @GetMapping("/all")
    public List<CandidateBasicDetails> getAllCandidates() {
        return candidateService.getAllCandidates();
    }

    @GetMapping("/{candidateId}")
    public CandidateBasicDetails getCandidateById(@PathVariable String candidateId) {
        return candidateService.getCandidateById(candidateId);
    }

    @PutMapping("/update")
    public String updateCandidate(@RequestBody CandidateBasicDetails updatedCandidate) {
        return candidateService.updateCandidate(updatedCandidate);
    }
    @PutMapping("/updateTechCandidate/{candidateId}")
    public ResponseEntity<?> updateTechCandidate(@PathVariable String candidateId,
                                                        @RequestParam String techInterviewDate,
                                                        @RequestParam String interviewerFeedback,
                                                        @RequestParam String candidateInterviewStatus) {
        CandidateDetails updatedCandidateDetails = candidateDetailsService.updateTechCandidateFields(
                candidateId, techInterviewDate, interviewerFeedback, candidateInterviewStatus);

        if (updatedCandidateDetails != null) {
            return new ResponseEntity<>(updatedCandidateDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Tech Candidate not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateBDCandidate/{candidateId}")
    public ResponseEntity<?> updateBDCandidate(@PathVariable String candidateId,
                                                     @RequestParam boolean loiSent,
                                                     @RequestParam boolean loiAccepted,
                                                     @RequestParam boolean joinedBatch,
                                                     @RequestParam String batchStartDate) {
        CandidateDetails updatedBDCandidateDetails = candidateDetailsService.updateBDCandidateFields(
                candidateId, loiSent, loiAccepted, joinedBatch, batchStartDate);

        if (updatedBDCandidateDetails != null) {
            return new ResponseEntity<>(updatedBDCandidateDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("BD Candidate not found", HttpStatus.NOT_FOUND);
        }
    }
    @RequestMapping("/next")
    CandidateBasicDetails getLatestId(){
    	CandidateBasicDetails next = new CandidateBasicDetails();
    	next.setCandidateId(String.format("SDP%1$" + 5 + "s", candidateService.getLatestId().toString()).replace(' ', '0'));
    	return next;
    }
}
