package com.snva.crmproject.repository.batch;

import org.springframework.data.jpa.repository.JpaRepository;


import com.snva.crmproject.entity.batchDetails.Batch;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {
}