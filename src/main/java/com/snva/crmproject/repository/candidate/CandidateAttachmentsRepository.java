package com.snva.crmproject.repository.candidate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.snva.crmproject.entity.CandidateAttachments;

public interface CandidateAttachmentsRepository extends JpaRepository<CandidateAttachments, Long> {
	List<CandidateAttachments> findByCandidateId(String candidateId);
    void deleteByCandidateId(String candidateId);
}