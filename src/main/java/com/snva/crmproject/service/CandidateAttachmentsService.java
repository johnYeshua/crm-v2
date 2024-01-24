package com.snva.crmproject.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.snva.crmproject.entity.CandidateAttachments;
import com.snva.crmproject.repository.candidate.CandidateAttachmentsRepository;

import java.util.Optional;

@Service
public class CandidateAttachmentsService {

    private final CandidateAttachmentsRepository candidateAttachmentsRepository;

    @Autowired
    public CandidateAttachmentsService(CandidateAttachmentsRepository candidateAttachmentsRepository) {
        this.candidateAttachmentsRepository = candidateAttachmentsRepository;
    }

    public Optional<CandidateAttachments> getCandidateAttachmentsById(Long attachmentId) {
        return candidateAttachmentsRepository.findById(attachmentId);
    }
}