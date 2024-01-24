package com.snva.crmproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.snva.crmproject.entity.batchDetails.Batch;
import com.snva.crmproject.service.BatchService;

import java.util.List;

@CrossOrigin(origins = "${fontEnd.origins}")
@RestController
@RequestMapping("/api/v1/batches")
public class BatchController {

    private final BatchService batchService;

    @Autowired
    public BatchController(BatchService batchService) {
        this.batchService = batchService;
    }

    @PostMapping
    public ResponseEntity<Batch> createBatch(@RequestBody Batch batch) {
        Batch createdBatch = batchService.createBatch(batch);
        return ResponseEntity.ok(createdBatch);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Batch> getBatchById(@PathVariable Long id) {
        return batchService.findBatchById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Batch> getAllBatches() {
        return batchService.findAllBatches();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Batch> updateBatch(@PathVariable Long id, @RequestBody Batch batch) {
        Batch updatedBatch = batchService.updateBatch(id, batch);
        if (updatedBatch != null) {
            return ResponseEntity.ok(updatedBatch);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBatch(@PathVariable Long id) {
        batchService.deleteBatch(id);
        return ResponseEntity.ok().build();
    }
}
