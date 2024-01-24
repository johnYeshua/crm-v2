package com.snva.crmproject.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.snva.crmproject.entity.batchDetails.Batch;
import com.snva.crmproject.repository.batch.BatchRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BatchServiceImpl implements BatchService {

    private final BatchRepository batchRepository;

    @Autowired
    public BatchServiceImpl(BatchRepository batchRepository) {
        this.batchRepository = batchRepository;
    }

    @Override
    @Transactional
    public Batch createBatch(Batch batch) {
        return batchRepository.save(batch);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Batch> findBatchById(Long id) {
        return batchRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Batch> findAllBatches() {
        return batchRepository.findAll();
    }

    @Override
    @Transactional
    public Batch updateBatch(Long id, Batch updatedBatch) {
        return batchRepository.findById(id).map(existingBatch -> {
            existingBatch.setStartDate(updatedBatch.getStartDate());
            existingBatch.setBatchType(updatedBatch.getBatchType());
            existingBatch.setStatus(updatedBatch.getStatus());
            return batchRepository.save(existingBatch);
        }).orElse(null); // Return null if the batch with the given id is not found
    }

    @Override
    @Transactional
    public void deleteBatch(Long id) {
        batchRepository.deleteById(id);
    }
}