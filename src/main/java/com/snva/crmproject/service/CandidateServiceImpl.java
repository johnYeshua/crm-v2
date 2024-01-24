package com.snva.crmproject.service;

import com.snva.crmproject.entity.CandidateAttachments;
import com.snva.crmproject.entity.CandidateBasicDetails;
import com.snva.crmproject.entity.CandidateDetails;
import com.snva.crmproject.repository.candidate.CandidateAttachmentsRepository;
import com.snva.crmproject.repository.candidate.CandidateBasicDetailsRepository;
import com.snva.crmproject.repository.candidate.CandidateDetailsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CandidateServiceImpl implements CandidateService {

    @Autowired
    private CandidateBasicDetailsRepository basicDetailsRepository;

    @Autowired
    private CandidateAttachmentsRepository attachmentsRepository;

    @Autowired
    private CandidateDetailsRepository detailsRepository;

    @Override
    public CandidateBasicDetails addNewCandidate(CandidateBasicDetails candidate) {
        basicDetailsRepository.save(candidate);

//        if (candidate.getAttachments() != null) {
//            for (CandidateAttachments attachment : candidate.getAttachments()) {
//                attachment.setCandidateId(candidate.getCandidateId());
//                attachmentsRepository.save(attachment);
//            }
//        }

        if (candidate.getDetails() != null) {
            candidate.getDetails().setCandidateId(candidate.getCandidateId());
            detailsRepository.save(candidate.getDetails());
        }

        return candidate;
    }

    @Override
    public List<CandidateBasicDetails> getAllCandidates() {
        List<CandidateBasicDetails> candidates = basicDetailsRepository.findAll();

//        for (CandidateBasicDetails candidate : candidates) {
////            candidate.setAttachments(attachmentsRepository.findByCandidateId(candidate.getCandidateId()));
//            candidate.setDetails(detailsRepository.findById(candidate.getCandidateId()).orElse(null));
//        }

        return candidates;
    }

    @Override
    public CandidateBasicDetails getCandidateById(String candidateId) {
        Optional<CandidateBasicDetails> optionalBasicDetails = basicDetailsRepository.findById(candidateId);

        if (optionalBasicDetails.isPresent()) {
            CandidateBasicDetails candidate = optionalBasicDetails.get();
//            candidate.setAttachments(attachmentsRepository.findByCandidateId(candidateId));
            candidate.setDetails(detailsRepository.findById(candidateId).orElse(null));
            return candidate;
        }

        return null;
    }

    @Override
    public String updateCandidate(CandidateBasicDetails updatedCandidate) {
        
        basicDetailsRepository.save(updatedCandidate);
        attachmentsRepository.deleteByCandidateId(updatedCandidate.getCandidateId());
//        if (updatedCandidate.getAttachments() != null) {
//            for (CandidateAttachments attachment : updatedCandidate.getAttachments()) {
//                attachment.setCandidateId(updatedCandidate.getCandidateId());
//                attachmentsRepository.save(attachment);
//            }
//        }

       
        CandidateDetails existingDetails = detailsRepository.findById(updatedCandidate.getCandidateId()).orElse(null);

        if (existingDetails != null) {
            
            existingDetails.setSkillSet(updatedCandidate.getDetails().getSkillSet());
            existingDetails.setCommunicationSkill(updatedCandidate.getDetails().getCommunicationSkill());
            existingDetails.setAddressLine1(updatedCandidate.getDetails().getAddressLine1());
            existingDetails.setAddressLine2(updatedCandidate.getDetails().getAddressLine2());
            existingDetails.setAddressCity(updatedCandidate.getDetails().getAddressCity());
            existingDetails.setAddressState(updatedCandidate.getDetails().getAddressState());
            existingDetails.setAddressCounty(updatedCandidate.getDetails().getAddressCounty());
            existingDetails.setAddressZipCode(updatedCandidate.getDetails().getAddressZipCode());
            existingDetails.setSource(updatedCandidate.getDetails().getSource());
            existingDetails.setRemarks(updatedCandidate.getDetails().getRemarks());
            existingDetails.setInterviewDate(updatedCandidate.getDetails().getInterviewDate());
            existingDetails.setInterviewerFeedback(updatedCandidate.getDetails().getInterviewerFeedback());
            existingDetails.setCandidateInterviewStatus(updatedCandidate.getDetails().getCandidateInterviewStatus());
            existingDetails.setLOISent(updatedCandidate.getDetails().getLOISent());
            existingDetails.setLOIAccepted(updatedCandidate.getDetails().getLOIAccepted());
            existingDetails.setJoinedBatch(updatedCandidate.getDetails().isJoinedBatch());
            existingDetails.setStartDate(updatedCandidate.getDetails().getStartDate());
            
           
            detailsRepository.save(existingDetails);
        }

         else {
           
            CandidateDetails newDetails = updatedCandidate.getDetails();
            newDetails.setCandidateId(updatedCandidate.getCandidateId());
            detailsRepository.save(newDetails);
        }

        return "Candidate updated successfully!";
    }

	@Override
	public Long getLatestId()
    {
        CandidateBasicDetails candidateBasicDetails = basicDetailsRepository.findTopByOrderByCandidateIdDesc();
        if(candidateBasicDetails == null) // if there is no data in the table.
        {
            return 1l;
        }
		return Long.parseLong(candidateBasicDetails.getCandidateId().substring(3, 8))+1;
	}
}
