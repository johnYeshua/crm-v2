package com.snva.crmproject.service;

import java.util.List;
import java.util.Optional;

import com.snva.crmproject.entity.batchDetails.Batch;

public interface BatchService {
    Batch createBatch(Batch batch);
    Optional<Batch> findBatchById(Long id); 
    List<Batch> findAllBatches();
    Batch updateBatch(Long id, Batch batch);
    void deleteBatch(Long id);
}