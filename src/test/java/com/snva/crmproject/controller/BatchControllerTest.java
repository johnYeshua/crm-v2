package com.snva.crmproject.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import com.snva.crmproject.CrmProjectApplication;
import com.snva.crmproject.entity.batchDetails.Batch;
import com.snva.crmproject.utility.TestUser;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = CrmProjectApplication.class)
@AutoConfigureMockMvc
public class BatchControllerTest {
    private static final Logger LOGGER = LoggerFactory.getLogger(BatchControllerTest.class);

    private static String authorization = TestUser.getBase64Credentials();
    private static Batch testingBatch;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void createBatchBeforeDeletion() throws Exception {
        if (testingBatch == null) {
            LOGGER.info("Creating a batch for testing");
            testingBatch = new Batch();
            testingBatch.setStartDate(new Date());
            testingBatch.setBatchType("test type");
            testingBatch.setStatus("test status");

            ResultActions result = mockMvc.perform(post("/api/v1/batches")
                    .header("Authorization", authorization)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(testingBatch)))
                    .andExpect(status().isOk());
            int batchId = JsonPath.read(result.andReturn().getResponse().getContentAsString(), "$.id");
            testingBatch.setId(Long.valueOf(batchId));
            LOGGER.info("Created batch got '" + testingBatch.getId() + "' id");
        }
    }

    @Test
    public void testCreateBatch() throws Exception {
        Batch batch = new Batch();
        batch.setStartDate(new Date());
        batch.setBatchType("regular");
        batch.setStatus("upcoming");

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders
                .post("/api/v1/batches")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(batch))
                .header("Authorization", authorization))
                .andReturn();

        assertEquals(HttpStatus.OK.value(), result.getResponse().getStatus()); // Check status code
        assertTrue(JsonPath.read(result.getResponse().getContentAsString(), "$.id") != null); // Check if id exists
        assertEquals("regular", JsonPath.read(result.getResponse().getContentAsString(), "$.batchType")); // Check batchType
        assertEquals("upcoming", JsonPath.read(result.getResponse().getContentAsString(), "$.status")); // Check status
        assertTrue(JsonPath.read(result.getResponse().getContentAsString(), "$.startDate") != null); // Check if startDate exists

        //clean up after ourselves
        int batchId = JsonPath.read(result.getResponse().getContentAsString(), "$.id");
        mockMvc.perform(delete("/api/v1/batches/{id}", batchId)
                .header("Authorization", authorization))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetBatchById() throws Exception {
        LOGGER.info("Pulling batch by id:" + testingBatch.getId());
        MvcResult result = mockMvc.perform(get("/api/v1/batches/{id}", testingBatch.getId())
                .header("Authorization", authorization))
                .andReturn();

        assertEquals(HttpStatus.OK.value(), result.getResponse().getStatus()); // Check status code
        Integer readId = JsonPath.read(result.getResponse().getContentAsString(), "$.id");
        assertEquals(testingBatch.getId(), Long.valueOf(readId)); // Check if id matches
        assertEquals(testingBatch.getBatchType(), JsonPath.read(result.getResponse().getContentAsString(), "$.batchType")); // Check batch_type
    }

    @Test
    public void testGetAllBatches() throws Exception {
        LOGGER.info("Pulling all batches from DB");
        mockMvc.perform(get("/api/v1/batches")
                .header("Authorization", authorization))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(Matchers.greaterThan(0)));
    }

    @Test
    public void testUpdateBatch() throws Exception {
        String TEST_VALUE = "new test value";
        testingBatch.setBatchType(TEST_VALUE);
        testingBatch.setStatus(TEST_VALUE);
        LOGGER.info("Testing batch update of a batch with id:" + testingBatch.getId());
        ResultActions result = mockMvc.perform(put("/api/v1/batches/{id}", testingBatch.getId())
                .header("Authorization", authorization)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testingBatch)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.batchType").value(TEST_VALUE))
                .andExpect(jsonPath("$.status").value(TEST_VALUE));
    }

    @Test
    public void testDeleteBatch() throws Exception {
        Long batchId = testingBatch.getId();
        LOGGER.info("Testing deletion of a batch with id:" + batchId);
        mockMvc.perform(delete("/api/v1/batches/{id}", batchId)
                .header("Authorization", authorization))
                .andExpect(status().isOk());
        testingBatch = null;
    }

    @AfterEach
    public void cleanUp() throws Exception {
        if (testingBatch != null) {
            LOGGER.info("Deleting testing batch");
            mockMvc.perform(delete("/api/v1/batches/{id}", testingBatch.getId())
                    .header("Authorization", authorization))
                    .andExpect(status().isOk());
            testingBatch = null;
        }
    }

}