package com.fraud.detection.service;

import com.fraud.detection.model.TransactionRequest;
import com.fraud.detection.model.FraudResponse;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FraudService {

    private final String FASTAPI_URL = "http://127.0.0.1:8000/predict";

    public FraudResponse checkFraud(TransactionRequest request) {

        RestTemplate restTemplate = new RestTemplate();

        FraudResponse response = restTemplate.postForObject(
                FASTAPI_URL,
                request,
                FraudResponse.class
        );

        return response;
    }
}