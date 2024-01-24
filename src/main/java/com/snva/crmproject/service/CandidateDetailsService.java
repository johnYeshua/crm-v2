package com.snva.crmproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.snva.crmproject.entity.CandidateDetails;
import com.snva.crmproject.repository.candidate.CandidateDetailsRepository;

import java.sql.Date;
import java.util.Optional;

@Service
public class CandidateDetailsService {

    private final CandidateDetailsRepository candidateDetailsRepository;

    @Autowired
    public CandidateDetailsService(CandidateDetailsRepository candidateDetailsRepository) {
        this.candidateDetailsRepository = candidateDetailsRepository;
    }

    public Optional<CandidateDetails> getCandidateDetailsById(String candidateId) {
        return candidateDetailsRepository.findById(candidateId);
    }

    public CandidateDetails updateTechCandidateFields(String candidateId, String techInterviewDate,
                                                      String interviewerFeedback, String candidateInterviewStatus) {
        Optional<CandidateDetails> optionalCandidateDetails = candidateDetailsRepository.findById(candidateId);

        if (optionalCandidateDetails.isPresent()) {
            CandidateDetails candidateDetails = optionalCandidateDetails.get();

            candidateDetails.setInterviewDate(techInterviewDate);
            candidateDetails.setInterviewerFeedback(interviewerFeedback);
            candidateDetails.setCandidateInterviewStatus(candidateInterviewStatus);

            return candidateDetailsRepository.save(candidateDetails);
        } else {
            // Handle the case where the candidate details are not found
            return null;
        }
    }

    public CandidateDetails updateBDCandidateFields(String candidateId, boolean loiSent, boolean loiAccepted,
                                                    boolean joinedBatch, String batchStartDate) {
        Optional<CandidateDetails> optionalCandidateDetails = candidateDetailsRepository.findById(candidateId);

        if (optionalCandidateDetails.isPresent()) {
            CandidateDetails candidateDetails = optionalCandidateDetails.get();

            candidateDetails.setLOISent(loiSent);
            candidateDetails.setLOIAccepted(loiAccepted);
            candidateDetails.setJoinedBatch(joinedBatch);
            candidateDetails.setStartDate(batchStartDate);

            return candidateDetailsRepository.save(candidateDetails);
        } else {
            // Handle the case where the candidate details are not found
            return null;
        }
    }
}
