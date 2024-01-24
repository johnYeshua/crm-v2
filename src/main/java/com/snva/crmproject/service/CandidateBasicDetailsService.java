package com.snva.crmproject.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.snva.crmproject.entity.CandidateBasicDetails;
import com.snva.crmproject.repository.candidate.CandidateBasicDetailsRepository;

import java.util.Optional;

@Service
public class CandidateBasicDetailsService {

    private final CandidateBasicDetailsRepository candidateBasicDetailsRepository;

    @Autowired
    public CandidateBasicDetailsService(CandidateBasicDetailsRepository candidateBasicDetailsRepository) {
        this.candidateBasicDetailsRepository = candidateBasicDetailsRepository;
    }

    public Optional<CandidateBasicDetails> getCandidateBasicDetailsById(String candidateId) {
        return candidateBasicDetailsRepository.findById(candidateId);
    }
}